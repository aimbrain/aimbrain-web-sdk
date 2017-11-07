import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { setPromiseContructor } from "../../src/util/promise";
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import { api } from "../../src/api";
import * as state from "../../src/session/state";
import * as calls from "../../src/session/calls";
import { session } from "../../src/session";

describe("session calls", () => {

    setPromiseContructor(<PromiseConstructor>Promise)

    let storage: Storage = global.sessionStorage;

    let xhr: sinon.SinonFakeXMLHttpRequest;
    let xhrRequests = [];

    beforeEach(() => {
        storage.clear();
        state.clearCache();
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

    it('create serialize', (done) => {
        calls.createSession("uid", "meta", true)
            .then((result) => {
                let data = JSON.parse(result);
                expect(data.userId).to.equal("uid");
                expect(data.metadata).to.equal("meta");
                expect(data.device).to.be.a('string');
                expect(data.system).to.be.a('string');
                expect(data.screenWidth).to.be.a('number');
                expect(data.screenHeight).to.be.a('number');  
            })
            .then(() => done(), (e) => done(e));
    });

    it('create request sets session', (done) => {
        expect(state.getCachedSession()).to.be.null;

        calls.createSession("uid", "meta", false)
            .then((result) => {
                expect(result.session).to.equal("sid");
                expect(state.getCachedSession()).to.be.not.null;
            })
            .then(() => done(), (e) => done(e));

        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "session" : "sid" }'); 
    });

    it('create failure returns ApiError', (done) => {
        calls.createSession("uid", "meta")
            .then(() => done("expect rejection"), (e: api.ApiCallError) => {
                expect(e.error).to.equal("message");
                expect(e.errorCode).to.equal(api.ErrorCode.ServerError);
                done();   
            });

        let xhr = lastRequest();        
        xhr.respond(500, {}, '{ "error" : "message" }'); 
    });

    it('ensure uses cached session', (done) => {
        session.setExistingSession("uid", "sid");

        calls.ensureSessionCreated("uid", "meta")
            .then((result) => {
                expect(result.session).to.equal("sid");
                expect(state.getCachedSession()).to.be.not.null;
            })
            .then(() => done(), (e) => done(e));

        let xhr = lastRequest();        
        expect(xhr).to.be.null;
    });

    it('ensure calls session', (done) => {
        calls.ensureSessionCreated("uid", "meta")
            .then((result) => {
                expect(result.session).to.equal("sid");
                expect(state.getCachedSession()).to.be.not.null;
            })
            .then(() => done(), (e) => done(e));

        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "session" : "sid" }'); 
    });
});
