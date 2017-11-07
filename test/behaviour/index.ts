import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { setPromiseContructor } from "../../src/util/promise";
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import { behaviour } from "../../src/behaviour";
import * as dom from "../../src/behaviour/dom";

describe("behaviour", () => {
    
    setPromiseContructor(<PromiseConstructor>Promise)

    function remove(el: HTMLElement) {
        el && el.parentNode && el.parentNode.removeChild(el);
    }

    it('set sensitive salt', () => {
        behaviour.setSensitiveSalt("salt");        
        expect(dom.sensitiveSalt).to.equal("salt");
    });

    it('set sensitive salt calls dom', () => {
        let setSaltStub = sinon.stub(dom, 'setSensitiveSalt');
        behaviour.setSensitiveSalt("salt");        
        expect(setSaltStub.callCount).to.equal(1);
        expect(setSaltStub.firstCall.args).to.deep.equal(["salt"]);        
        setSaltStub.restore();
    });

    it('set id calls dom', () => {
        let el = document.createElement('div');
        let setIdStub = sinon.stub(dom, 'setElementSdkId');
        behaviour.setAimbrainId("id", el);
        expect(setIdStub.callCount).to.equal(1);
        expect(setIdStub.firstCall.args).to.deep.equal(["id", el]);  
        setIdStub.restore();
        remove(el);
    });   
    
    it('set sensitive calls dom one', () => {
        let el = document.createElement('div');
        let setSensitiveStub = sinon.stub(dom, 'setSensitive');
        behaviour.addToSensitiveList(el);
        expect(setSensitiveStub.callCount).to.equal(1);
        expect(setSensitiveStub.firstCall.args).to.deep.equal([[el]]);  
        setSensitiveStub.restore();
        remove(el);
    });

    it('set sensitive calls dom list', () => {
        let el = document.createElement('div');
        let el2 = document.createElement('div');
        let setSensitiveStub = sinon.stub(dom, 'setSensitive');
        behaviour.addToSensitiveList([el, el2]);
        expect(setSensitiveStub.callCount).to.equal(1);
        expect(setSensitiveStub.firstCall.args).to.deep.equal([[el, el2]]);  
        setSensitiveStub.restore();
        remove(el);
        remove(el2);
    });    

    it('unset sensitive calls dom one', () => {
        let el = document.createElement('div');
        let unsetSensitiveStub = sinon.stub(dom, 'unsetSensitive');
        behaviour.removeFromSensitiveList(el);
        expect(unsetSensitiveStub.callCount).to.equal(1);
        expect(unsetSensitiveStub.firstCall.args).to.deep.equal([[el]]);  
        unsetSensitiveStub.restore();
        remove(el);
    });

    it('unset sensitive calls dom list', () => {
        let el = document.createElement('div');
        let el2 = document.createElement('div');
        let unsetSensitiveStub = sinon.stub(dom, 'unsetSensitive');
        behaviour.removeFromSensitiveList([el, el2]);
        expect(unsetSensitiveStub.callCount).to.equal(1);
        expect(unsetSensitiveStub.firstCall.args).to.deep.equal([[el, el2]]);  
        unsetSensitiveStub.restore();
        remove(el);
        remove(el2);
    });

    it('set ignored calls dom one', () => {
        let el = document.createElement('div');
        let setIgnoredStub = sinon.stub(dom, 'setIgnored');
        behaviour.addToUntrackableList(el);
        expect(setIgnoredStub.callCount).to.equal(1);
        expect(setIgnoredStub.firstCall.args).to.deep.equal([[el]]);  
        setIgnoredStub.restore();
        remove(el);
    });

    it('set ignored calls dom list', () => {
        let el = document.createElement('div');
        let el2 = document.createElement('div');
        let setIgnoredStub = sinon.stub(dom, 'setIgnored');
        behaviour.addToUntrackableList([el, el2]);
        expect(setIgnoredStub.callCount).to.equal(1);
        expect(setIgnoredStub.firstCall.args).to.deep.equal([[el, el2]]);  
        setIgnoredStub.restore();
        remove(el);
        remove(el2);
    });    

    it('unset ignored calls dom one', () => {
        let el = document.createElement('div');
        let unsetIgnoredStub = sinon.stub(dom, 'unsetIgnored');
        behaviour.removeFromUntrackableList(el);
        expect(unsetIgnoredStub.callCount).to.equal(1);
        expect(unsetIgnoredStub.firstCall.args).to.deep.equal([[el]]);  
        unsetIgnoredStub.restore();
        remove(el);
    });

    it('unset ignored calls dom list', () => {
        let el = document.createElement('div');
        let el2 = document.createElement('div');
        let unsetIgnoredStub = sinon.stub(dom, 'unsetIgnored');
        behaviour.removeFromUntrackableList([el, el2]);
        expect(unsetIgnoredStub.callCount).to.equal(1);
        expect(unsetIgnoredStub.firstCall.args).to.deep.equal([[el, el2]]);  
        unsetIgnoredStub.restore();
        remove(el);
        remove(el2);
    });    
});