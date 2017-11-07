import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { setPromiseContructor } from "../../src/util/promise";
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import { api } from "../../src/api";
import * as state from "../../src/session/state";
import { session } from "../../src/session";
import * as calls from "../../src/facial/calls";

describe("facial calls", () => {

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

    let faces = [
       "AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAGm1kYXQAAAGzABAHAAABthBg\
        UYI9t+8AAAMNbW9vdgAAAGxtdmhkAAAAAMXMvvrFzL76AAAD6AAAACoAAQAAAQAAAAAAAAAAAAAA\
        AAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
        AAAAAAAAAgAAABhpb2RzAAAAABCAgIAHAE/////+/wAAAiF0cmFrAAAAXHRraGQAAAAPxcy++sXM\
        vvoAAAABAAAAAAAAACoAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAA\
        AAAAAABAAAAAAAgAAAAIAAAAAAG9bWRpYQAAACBtZGhkAAAAAMXMvvrFzL76AAAAGAAAAAEVxwAA\
        AAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABaG1pbmYAAAAU\
        dm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAShz\
        dGJsAAAAxHN0c2QAAAAAAAAAAQAAALRtcDR2AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAgACABI\
        AAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAXmVzZHMA\
        AAAAA4CAgE0AAQAEgICAPyARAAAAAAMNQAAAAAAFgICALQAAAbABAAABtYkTAAABAAAAASAAxI2I\
        AMUARAEUQwAAAbJMYXZjNTMuMzUuMAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAAABAAAAAQAAABxz\
        dHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAASAAAAAQAAABRzdGNvAAAAAAAA\
        AAEAAAAsAAAAYHVkdGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAA\
        AAAAAAAraWxzdAAAACOpdG9vAAAAG2RhdGEAAAABAAAAAExhdmY1My4yMS4x"
    ];

    it('enrollWithData requires session', (done) => {        
        calls.enrollWithData(faces, "meta", true)
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
        return calls.enrollWithData(faces, "meta", true)
            .then((result) => {
                let data = JSON.parse(result);
                expect(data.session).to.equal("sid");
                expect(data.metadata).to.equal("meta");
                expect(data.faces).to.deep.equal(faces);
            });
    });

    it('enrollWithData api call', (done) => {
        session.setExistingSession("uid", "sid")
        calls.enrollWithData(faces, "meta")
            .then((result) => {  
                expect(result.imagesCount).to.equal(1);
            })
            .then(() => done(), (e) => done(e));
 
        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "imagesCount" : 1 }'); 
    });

    it('authenticateWithData requires session', (done) => {        
        calls.authenticateWithData(faces, "meta", true)
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
        let faces = ["data1"];
        return calls.authenticateWithData(faces, "meta", true)
            .then((result) => {
                let data = JSON.parse(result);
                expect(data.session).to.equal("sid");
                expect(data.metadata).to.equal("meta");
                expect(data.faces).to.deep.equal(faces);
            });
    });

    it('authenticateWithData api call', (done) => {
        session.setExistingSession("uid", "sid")
        calls.authenticateWithData(faces, "meta")
            .then((result) => {  
                expect(result.liveliness).to.be.a('number');
                expect(result.score).to.be.a('number');
            })
            .then(() => done(), (e) => done(e));
 
        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "score" : 1.0, "liveliness" : 0.0 }'); 
    });
});
