import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { setPromiseContructor } from "../../src/util/promise";
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import { api } from "../../src/api";
import * as state from "../../src/session/state";
import { session } from "../../src/session";
import * as calls from "../../src/behaviour/calls";
import * as storage from "../../src/behaviour/storage";

describe("behaviour calls", () => {
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

    let m1 = {
        docx: 200,
        docy: 100,
        elx: 20,
        ely: 10,
        t: 10,
        no: 5,
        type: storage.MouseEventType.MOVE,
        id: 'id1',
    }

    let m2 = {
        docx: 200,
        docy: 100,
        elx: 20,
        ely: 10,
        t: 20,
        no: 5,
        type: storage.MouseEventType.MOVE,
        id: 'id2',
    }

    let k1 = {
        t: 10,
        key: "a",
        dir: storage.KeyDirection.DOWN,
        id: "id1"
    }

    let k2 = {
        t: 20,
        key: "b",
        dir: storage.KeyDirection.UP,
        id: "id2"
    }

    it('sendEvents requires session', (done) => {        
        calls.sendEvents([m1, m2], [k1, k2], "meta")
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

    it('sendEvents serialize', () => {
        session.setExistingSession("uid", "sid")
        return calls.sendEvents([m1, m2], [k1, k2], "meta", true)
            .then((result) => {
                let data = JSON.parse(result);
                expect(data.session).to.equal("sid");
                expect(data.metadata).to.equal("meta");
                expect(data.mouseEvents).to.deep.equal([m1, m2]);
                expect(data.keyUpDownEvents).to.deep.equal([k1, k2]);
            });
    });

    it('enrollWithData api call', (done) => {
        session.setExistingSession("uid", "sid")
        calls.sendEvents([m1, m2], [k1, k2], "meta")
            .then((result) => {  
                expect(result.score).to.be.a('number');
                expect(result.status).to.be.a('number');
            })
            .then(() => done(), (e) => done(e));
 
        let xhr = lastRequest();        
        xhr.respond(200, {}, '{ "score" : 1, "status": 1 }'); 
    });
});
