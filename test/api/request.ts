import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { Promise } from 'es6-promise';

import { setPromiseContructor } from "../../src/util/promise";
import * as apiRequests from "../../src/api/request";

describe('request', () => {
    setPromiseContructor(<PromiseConstructor>Promise)
    
    beforeEach(() => {
        apiRequests.setBaseUrl("http://example.com");
    });

    it('base url', () => {
        let request = apiRequests.createRequest({
            method: "get" 
        })
        
        expect(request.baseUrl).to.equal("http://example.com");
    });

    it('signature created', () => {
        apiRequests.setApiCredentials('test', 'secret');
        
        let request = apiRequests.createRequest({
            method: "get" 
        })
        
        expect(request.headers["X-aimbrain-apikey"]).to.equal("test");
        expect(request.headers["X-aimbrain-signature"]).to.be.a('string');
    });
});