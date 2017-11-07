import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { Promise } from 'es6-promise';

import { setPromiseContructor } from "../../src/util/promise";
import { Request, RequestConfig } from "../../src/util/request";
 

describe('request', () => {
    setPromiseContructor(<PromiseConstructor>Promise)

    let xhr: sinon.SinonFakeXMLHttpRequest;
    var xhrRequests = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = (request) => {
            xhrRequests.push(request);
        }
    });

    afterEach(() => {
        xhrRequests.pop();
        xhr.restore();
    });

    function lastRequest(): sinon.SinonFakeXMLHttpRequest {
        return xhrRequests.length == 0 ? null : xhrRequests[0];
    }

    it('url path', (done) => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "get",
            uri: "/path"
        })

        request.then(() => done(), (e) => done(e));

        let xhr = lastRequest();
        expect(xhr.url).to.equal("http://example.com/path");
        xhr.respond(200, {}, "response"); 
    });

    it('url and metod', (done) => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "get"
        })

        request.then(() => done(), (e) => done(e));

        let xhr = lastRequest();
        expect(xhr.method).to.equal("get");
        expect(xhr.url).to.equal("http://example.com");
        
        xhr.respond(200, {}, "response"); 
    });

    it('error 500', (done) => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "get"
        })

        request.then(() => done(new Error('expected error')), (error) => { 
            expect(error.key).to.equal("value");
            expect(error.errorCode).to.equal(500);
            return done();
        });
        
        let xhr = lastRequest();
        xhr.respond(500, {}, '{ "key": "value" }'); 
    });

    it('string response', (done) => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "get"
        })

        request.then(() => done(), (e) => {
                expect(e.error).to.equal("response");
                expect(e.errorCode).to.equal(0);
                return done()
            });

        let xhr = lastRequest();        
        xhr.respond(200, {}, "response"); 
    });

    it('json response', (done) => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "get"
        })

        request.then((responseContent) => {
                expect(responseContent).to.deep.equal({"key": "value"});
            })            
            .then(() => done(), (e) => done(e));

        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "key": "value" }'); 
    });

    it('header', (done) => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "post",
            headers: { "X-test" : "value" }
        })

        request.then(() => done(), (e) => done(e));

        let xhr = lastRequest();  
        expect(xhr.requestHeaders["X-test"]).to.equal("value")      
        xhr.respond(200, {}, "response"); 
    });

    it('body', (done) => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "post",
            body: { "key" : "value" }
        })

        request.then(() => done(), (e) => done(e));

        let xhr = lastRequest();  
        expect(JSON.parse(xhr.requestBody)).to.deep.equal({ "key" : "value" })      
        xhr.respond(200, {}, "response"); 
    });

    it('use', (done) => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "get"
        })

        request.use((value) => {
            expect(value).to.deep.equal({ error: "response", errorCode: 1 });
        }, (reason) => {
            done(new Error('expected success'));
        })

        request.then(() => done(), (e) => done(e));

        let xhr = lastRequest();      
        xhr.respond(200, {}, "response"); 
    });

    it('serialize body', () => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "post",
            body: { "key" : "value" }
        })
        let serialized = request.serialize();
        expect(JSON.parse(serialized)).to.deep.equal({ "key" : "value" })      
    });

    it('writeble headers', () => {
        let request = new Request<string>({
            baseUrl: "http://example.com",
            method: "get"
        })
        request.headers["X-another"] = "another";
        expect(request.headers["X-another"]).to.equal("another"); 
    });
});