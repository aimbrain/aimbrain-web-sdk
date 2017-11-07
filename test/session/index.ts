import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { setPromiseContructor } from "../../src/util/promise";
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import { api } from "../../src/api";
import { session } from "../../src/session";
import * as state from "../../src/session/state";

describe("session", () => {

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

    it('no session', () => {
        expect(session.isSessionActive()).to.be.false;
        expect(session.getSessionId()).to.be.null;

        expect(session.isBehaviouralBuilding()).to.be.false;
        expect(session.isBehaviouralEnrolled()).to.be.false;

        expect(session.isFacialBuilding()).to.be.false;
        expect(session.isFacialEnrolled()).to.be.false;
        
        expect(session.isVoiceBuilding()).to.be.false;
        expect(session.isVoiceEnrolled()).to.be.false;
    });

    it('clear session', () => {
        expect(session.isSessionActive()).to.be.false;
        expect(session.getSessionId()).to.be.null;
        
        session.setExistingSession("uid", "sid");
        
        expect(session.isSessionActive()).to.be.true;
        expect(session.getSessionId()).to.equal("sid");

        session.clearSession();

        expect(session.isSessionActive()).to.be.false;
        expect(session.getSessionId()).to.be.null;        
    });

    it('existing session', () => {
        expect(session.isSessionActive()).to.be.false;

        session.setExistingSession("uid", "sid");

        expect(session.isSessionActive()).to.be.true;
        expect(session.getSessionId()).to.equal("sid");

        expect(session.isBehaviouralBuilding()).to.be.false;
        expect(session.isBehaviouralEnrolled()).to.be.true;

        expect(session.isFacialBuilding()).to.be.false;
        expect(session.isFacialEnrolled()).to.be.true;
        
        expect(session.isVoiceBuilding()).to.be.false;
        expect(session.isVoiceEnrolled()).to.be.true;
    });

    it('establish serialises', (done) => {
        session.setExistingSession("uid", "sid");

        session.establishSession("uid", null, true)
            .then((result) => {
                let data = JSON.parse(result);
                expect(data.userId).to.equal("uid");
            })
            .then(() => done(), (e) => done(e));

        let xhr = lastRequest();        
        expect(xhr).to.be.null;
    });

    it('establish calls session', (done) => {
        session.establishSession("uid", null, false)
            .then((result) => {
                expect(result.session).to.equal("sid");
                expect(state.getCachedSession()).to.be.not.null;
            })
            .then(() => done(), (e) => done(e));

        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "session" : "sid" }'); 
    });
});
