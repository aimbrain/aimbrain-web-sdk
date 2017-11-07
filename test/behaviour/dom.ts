import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { setPromiseContructor } from "../../src/util/promise";
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import * as dom from "../../src/behaviour/dom";

describe("behaviour dom", () => {
    
    setPromiseContructor(<PromiseConstructor>Promise)
    
    function loadHtml(file: string) {
        let templates = window['__html__'];       
        if (templates) {
            let template = templates[file];
            if (template) {
                document.body.innerHTML = template;                
            }    
            else {
                throw "No html template " + file;
            }
        } 
        else {
            throw "No html templates";
        }
    } 

    it('no id from markup', function() {
        loadHtml('behaviour/dom-id.html');
        let el = document.getElementsByName("no-id")[0];
        expect(dom.getElementSdkId(el)).to.be.null;
    });

    it('id from markup id', function() {
        loadHtml('behaviour/dom-id.html');
        let el = document.getElementById("id-id");
        expect(dom.getElementSdkId(el)).to.equal("id-id");
    });
    
    it('id from markup attr', function() {
        loadHtml('behaviour/dom-id.html');        
        let el = document.getElementById("sdk-id");
        expect(dom.getElementSdkId(el)).to.equal("sdk-id");
    });
    
    it('set id', function() {
        loadHtml('behaviour/dom-id.html');     
        let el = document.getElementsByName("no-id")[0];
        dom.setElementSdkId("new-sdk-id", el);   
        expect(dom.getElementSdkId(el)).to.equal("new-sdk-id");    
    });

    it('sensitive from markup attr', function() {
        loadHtml('behaviour/dom-sensitive.html');        
        let el = document.getElementById("not-sensitive");
        expect(dom.isSensitive(el)).to.be.false;

        let el2 = document.getElementById("sensitive");
        expect(dom.isSensitive(el2)).to.be.true;
    });

    it('set sensitive', function() {
        loadHtml('behaviour/dom-sensitive.html');        
        let el = document.getElementById("not-sensitive");
        expect(dom.isSensitive(el)).to.be.false;
        dom.setSensitive([el]);
        expect(dom.isSensitive(el)).to.be.true;
    });

    it('unset sensitive', function() {
        loadHtml('behaviour/dom-sensitive.html');        
        let el = document.getElementById("sensitive");
        expect(dom.isSensitive(el)).to.be.true;
        dom.unsetSensitive([el]);
        expect(dom.isSensitive(el)).to.be.false;
    });

    it('ignored from markup attr', function() {
        loadHtml('behaviour/dom-ignored.html');        
        let el = document.getElementById("not-ignored");
        expect(dom.isIgnored(el)).to.be.false;
        let el2 = document.getElementById("ignored");
        expect(dom.isIgnored(el2)).to.be.true;
    });

    it('set ignored', function() {
        loadHtml('behaviour/dom-ignored.html');        
        let el = document.getElementById("not-ignored");
        expect(dom.isIgnored(el)).to.be.false;
        dom.setIgnored([el]);
        expect(dom.isIgnored(el)).to.be.true;
    });

    it('unset ignored', function() {
        loadHtml('behaviour/dom-ignored.html');        
        let el = document.getElementById("ignored");
        expect(dom.isIgnored(el)).to.be.true;
        dom.unsetIgnored([el]);
        expect(dom.isIgnored(el)).to.be.false;
    });

    it('sensitive id', function() {
        loadHtml('behaviour/dom-id.html');        
        let el = document.getElementById("sdk-id");
        expect(dom.getElementSdkId(el)).to.equal("sdk-id");
        dom.setSensitive([el]);
        expect(dom.getElementSdkId(el)).match(/^[a-z0-9]{64}$]*/);
    });
});



