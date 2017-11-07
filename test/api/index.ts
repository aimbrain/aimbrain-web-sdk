import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { Promise } from 'es6-promise';

import { setPromiseContructor } from "../../src/util/promise";
import { Request } from "../../src/util/request";
import { api } from "../../src/api";


describe('request', () => {
    setPromiseContructor(<PromiseConstructor>Promise)

    beforeEach(() => {
        api.setBaseUrl("http://example.com");
        api.setKeyAndSecret('test', 'secret');
    });

    function expectCorrectConfig<T>(request: Request<T>) {
        expect(request.baseUrl).to.equal("http://example.com");
        expect(request.headers["X-aimbrain-apikey"]).to.equal("test");
        expect(request.headers["X-aimbrain-signature"]).to.be.a('string');
    }

    function expectGet<T>(request: Request<T>, path: string) {
        expect(request.method).to.equal("get");
        expect(request.uri).to.equal(path);
    }

    function expectPost<T>(request: Request<T>, path: string, body: any) {
        expect(request.method).to.equal("post");
        expect(request.uri).to.equal(path);
        expect(request.body).to.deep.equal(body);
    }

    it('create session', () => {
        let request = api.createSession("uid", "name", "os", 768, 1024);
        expectCorrectConfig(request);
        expectPost(request, "/v1/sessions", {
            "userId" : "uid",
            "system": "os",
            "device": "name",
            "screenWidth": 1024,
            "screenHeight": 768
        });
    });

    it('create session + metadata', () => {
        let request = api.createSession("uid", "name", "os", 768, 1024, "meta");
        expectCorrectConfig(request);
        expectPost(request, "/v1/sessions", {
            "userId" : "uid",
            "system": "os",
            "device": "name",
            "screenWidth": 1024,
            "screenHeight": 768,
            "metadata": "meta"
        });
    });

    let testMouseEvents = [ { "x": 0, "y": 0 }, { "x": 1, "y": 1 } ];
    let testKeyEvents = [ { "t": 0, "c": "a" } ];

    it('send events', () => {
        let request = api.sendEvents("session", testMouseEvents, testKeyEvents);
        expectCorrectConfig(request);
        expectPost(request, "/v1/behavioural", {
            "session" : "session",
            "mouseEvents": testMouseEvents,
            "keyUpDownEvents": testKeyEvents
        });
    });

    it('send events + metadata', () => {
        let request = api.sendEvents("session", testMouseEvents, testKeyEvents, "meta");
        expectCorrectConfig(request);
        expectPost(request, "/v1/behavioural", {
            "session" : "session",
            "mouseEvents": testMouseEvents,
            "keyUpDownEvents": testKeyEvents,
            "metadata": "meta"
        });
    });

    it('get voice challenge', () => {
        let request = api.getVoiceChallenge("session", "token");
        expectCorrectConfig(request);
        expectPost(request, "/v1/voice/token", {
            "session" : "session",
            "tokentype": "token"
        });
    });

    it('get voice challenge + metadata', () => {
        let request = api.getVoiceChallenge("session", "token", "meta");
        expectCorrectConfig(request);
        expectPost(request, "/v1/voice/token", {
            "session" : "session",
            "tokentype": "token", 
            "metadata": "meta"
        });
    });
   
    let testVoiceSamples = [ "AAAABBBBCCCCDDDDD="];

    it('enroll voice', () => {
        let request = api.enrollVoice("session", testVoiceSamples);
        expectCorrectConfig(request);
        expectPost(request, "/v1/voice/enroll", {
            "session" : "session",
            "voices" : testVoiceSamples
        });
    });

    it('enroll voice + metadata', () => {
        let request = api.enrollVoice("session", testVoiceSamples, "meta");
        expectCorrectConfig(request);
        expectPost(request, "/v1/voice/enroll", {
            "session" : "session",
            "voices" : testVoiceSamples,
            "metadata": "meta"
        });
    });

    it('auth voice', () => {
        let request = api.authenticateVoice("session", testVoiceSamples);
        expectCorrectConfig(request);
        expectPost(request, "/v1/voice/auth", {
            "session" : "session",
            "voices" : testVoiceSamples
        });
    });

    it('auth voice + metadata', () => {
        let request = api.authenticateVoice("session", testVoiceSamples, "meta");
        expectCorrectConfig(request);
        expectPost(request, "/v1/voice/auth", {
            "session" : "session",
            "voices" : testVoiceSamples,
            "metadata": "meta"
        });
    });

    let testFaceData = [ "AAAABBBBCCCCDDDDD="];
    
    it('enroll voice', () => {
        let request = api.enrollFace("session", testFaceData);
        expectCorrectConfig(request);
        expectPost(request, "/v1/face/enroll", {
            "session" : "session",
            "faces" : testFaceData
        });
    });

    it('enroll voice + metadata', () => {
        let request = api.enrollFace("session", testFaceData, "meta");
        expectCorrectConfig(request);
        expectPost(request, "/v1/face/enroll", {
            "session" : "session",
            "faces" : testFaceData,
            "metadata": "meta"
        });
    });

    it('auth face', () => {
        let request = api.authenticateFace("session", testFaceData);
        expectCorrectConfig(request);
        expectPost(request, "/v1/face/auth", {
            "session" : "session",
            "faces" : testFaceData
        });
    });

    it('auth face + metadata', () => {
        let request = api.authenticateFace("session", testFaceData, "meta");
        expectCorrectConfig(request);
        expectPost(request, "/v1/face/auth", {
            "session" : "session",
            "faces" : testFaceData,
            "metadata": "meta"
        });
    });
});