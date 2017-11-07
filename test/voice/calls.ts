import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { setPromiseContructor } from "../../src/util/promise";
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import { Request } from "../../src/util/request";
import { api } from "../../src/api";
import * as state from "../../src/session/state";
import { session } from "../../src/session";
import * as calls from "../../src/voice/calls";

describe("voice calls", () => {

    setPromiseContructor(<PromiseConstructor>Promise)

    let xhr: sinon.SinonFakeXMLHttpRequest;
    let xhrRequests = [];

    beforeEach(() => {
        session.clearSession();
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

    function expectPost<T>(request: Request<T>, path: string, body: any) {
        expect(request.method).to.equal("post");
        expect(request.uri).to.equal(path);
        expect(request.body).to.deep.equal(body);
    }

    let voices = ["UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="];

    it('enrollWithData requires session', (done) => {        
        calls.enrollWithData(voices, "meta", true)
            .then(() => done("expect rejection"), (e: api.ApiCallError) => {
                try {
                    expect(e.error).to.be.not.null;
                    expect(e.errorCode).to.equal(api.ErrorCode.NoOpenSession);   
                    done();   
                }
                catch(e) {
                    done(e);
                }
            });
    });

    it('enrollWithData serialize', () => {
        session.setExistingSession("uid", "sid")
        return calls.enrollWithData(voices, "meta", true)
            .then((result) => {
                let data = JSON.parse(result);
                expect(data.session).to.equal("sid");
                expect(data.metadata).to.equal("meta");
                expect(data.voices).to.deep.equal(voices);
            });
    });

    it('enrollWithData api call', (done) => {
        session.setExistingSession("uid", "sid")
        calls.enrollWithData(voices, "meta")
            .then((result) => {  
                expect(result.voiceSamples).to.equal(2);
            })
            .then(() => done(), (e) => done(e));
 
        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "voiceSamples" : 2 }'); 
    });

    it('authenticateWithData requires session', (done) => {        
        calls.authenticateWithData(voices, "meta", true)
            .then(() => done("expect rejection"), (e: api.ApiCallError) => {
                try {
                    expect(e.error).to.be.not.null;
                    expect(e.errorCode).to.equal(api.ErrorCode.NoOpenSession);   
                    done();   
                }
                catch(e) {
                    done(e);
                }
            });
    });

    it('authenticateWithData serialize', () => {
        session.setExistingSession("uid", "sid")
        return calls.authenticateWithData(voices, "meta", true)
            .then((result) => {
                let data = JSON.parse(result);
                expect(data.session).to.equal("sid");
                expect(data.metadata).to.equal("meta");
                expect(data.voices).to.deep.equal(voices);
            });
    });

    it('authenticateWithData api call', (done) => {
        session.setExistingSession("uid", "sid")
        calls.authenticateWithData(voices, "meta")
            .then((result) => {  
                expect(result.score).to.be.a('number')
                expect(result.liveliness).to.be.a('number')
            })
            .then(() => done(), (e) => done(e));
 
        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "score" : 0.69, "liveliness" : 0.5 }'); 
    });

    it('getEnrollmentChallengeText requires session', (done) => {        
        calls.getEnrollmentChallengeText("token-type", "meta", true)
            .then(() => done("expect rejection"), (e: api.ApiCallError) => {
                try {
                    expect(e.error).to.be.not.null;
                    expect(e.errorCode).to.equal(api.ErrorCode.NoOpenSession);   
                    done();   
                }
                catch(e) {
                    done(e);
                }
            });
    });

    it('getEnrollmentChallengeText serialize', () => {
        session.setExistingSession("uid", "sid")
        return calls.getEnrollmentChallengeText("token-type", "meta", true)
            .then((result) => {
                let data = JSON.parse(result);
                expect(data.tokentype).to.equal("token-type");
                expect(data.metadata).to.equal("meta");
            });
    });

    it('getEnrollmentChallengeText call api', (done) => {
        session.setExistingSession("uid", "sid")
        calls.getEnrollmentChallengeText("token-type", "meta", false)
            .then((result) => {
                expect(result).to.equal("token");
            })
            .then(() => done(), (e) => done(e));

        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "token" : "token" }'); 
    });

    it('getAuthenticationChallengeText requires session', (done) => {        
        calls.getAuthenticationChallengeText(null, true)
            .then(() => done("expect rejection"), (e: api.ApiCallError) => {
                try {
                    expect(e.error).to.be.not.null;
                    expect(e.errorCode).to.equal(api.ErrorCode.NoOpenSession);   
                    done();   
                }
                catch(e) {
                    done(e);
                }
            });
    });

    it('getAuthenticationChallengeText serialize', () => {
        session.setExistingSession("uid", "sid")
        return calls.getAuthenticationChallengeText("meta", true)
            .then((result) => {
                let data = JSON.parse(result);
                expect(data.tokentype).to.equal("auth");
                expect(data.metadata).to.equal("meta");
            });
    });

    it('getEnrollmentChallengeText call api', (done) => {
        session.setExistingSession("uid", "sid")
        calls.getAuthenticationChallengeText("meta", false)
            .then((result) => {
                expect(result).to.equal("token");
            })
            .then(() => done(), (e) => done(e));

        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "token" : "token" }'); 
    });
});
