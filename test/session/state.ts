import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import { api } from "../../src/api";
import * as state from "../../src/session/state";

describe("session state", () => {

    let storage: Storage = global.sessionStorage;

    beforeEach(() => {
        storage.clear();
        state.clearCache();
    });

    it('has session storage', () => {
        expect(storage).to.be.not.a('null');
    });

    it('empty session default', () => {
        let session = state.getCachedSession()
        expect(session).to.be.a('null');
    });

    let testSession = new state.Session("uid", "sid",
        api.EnrollmentStatus.NotEnrolled, 
        api.EnrollmentStatus.Enrolled, 
        api.EnrollmentStatus.Building);

    it('set session', () => {
        let status = api.EnrollmentStatus.Building;
        state.setCachedSession(testSession);

        let saved = state.getCachedSession()

        expect(saved.userId).to.equal("uid");
        expect(saved.session).to.equal("sid");
        expect(saved.isBehaviouralBuilding()).to.be.false;
        expect(saved.isBehaviouralEnrolled()).to.be.false;

        expect(saved.isFacialBuilding()).to.be.false;
        expect(saved.isFacialEnrolled()).to.be.true;
        
        expect(saved.isVoiceBuilding()).to.be.true;
        expect(saved.isVoiceEnrolled()).to.be.false;
    });

    it('clear session', () => {
        state.setCachedSession(testSession);

        let saved = state.getCachedSession()
        expect(saved).to.not.be.null;

        state.clearCache();
        let saved2 = state.getCachedSession()

        expect(saved2).to.be.null;
    });

    it('deserialize', () => {
        let serialized = '{"userId":"uid","sessionId":"sid","face":1,"voice":2,"behaviour":0}';
        storage.setItem("aimbrain_session", serialized);

        let saved = state.getCachedSession()
        expect(saved).to.not.be.null;

        expect(saved.userId).to.equal("uid");
        expect(saved.session).to.equal("sid");
        expect(saved.isBehaviouralBuilding()).to.be.false;
        expect(saved.isBehaviouralEnrolled()).to.be.false;

        expect(saved.isFacialBuilding()).to.be.false;
        expect(saved.isFacialEnrolled()).to.be.true;
        
        expect(saved.isVoiceBuilding()).to.be.true;
        expect(saved.isVoiceEnrolled()).to.be.false;
    });
});
