import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { setPromiseContructor } from "../../src/util/promise";
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import * as storage from "../../src/behaviour/storage";
import * as upload from "../../src/behaviour/upload";

describe("behaviour storage", () => {
    
    setPromiseContructor(<PromiseConstructor>Promise)
    
    beforeEach(() => {
        storage.dropSdkDB();
    });

    function getAll<T>(store: string) : Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            storage.getSdkDB().then((database) => {
                let tx = database.transaction(store);
                let events:Array<T> = [];

                tx.oncomplete = function(evt) { 
                    resolve(events);
                };

                let req = tx.objectStore(store).openCursor();
                    
                req.onerror = function(error) {
                    reject(error);
                };
                    
                req.onsuccess = function(evt) {            
                    var cursor = (<IDBRequest>evt.target).result; 
                    if (cursor) {
                        events.push(cursor.value);
                        cursor.continue();
                    }
                };  
            });
        }); 
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

    function expectKeyEventsEqual(a: storage.KeyEvent, b: storage.KeyEvent) {
        expect(a.key).is.equal(b.key);
        expect(a.dir).is.equal(b.dir);
        expect(a.t).is.equal(b.t);
        expect(a.ids).is.deep.equal(b.ids);
    }

    function expectMouseEventsEqual(a: storage.MouseEvent, b: storage.MouseEvent) {
        expect(b.docx).is.equal(a.docx);
        expect(b.docy).is.equal(a.docy);
        expect(b.elx).is.equal(a.elx);
        expect(b.ely).is.equal(a.ely);
        expect(b.t).is.equal(a.t);
        expect(b.no).is.equal(a.no);
        expect(b.type).is.equal(a.type);
        expect(b.ids).is.deep.equal(a.ids);
    }

    it('upload serialises events', () => {
        Promise.resolve().then(() => {
            return storage.addMouseEvent(m1);
        })
        .then(() => {
            return storage.addMouseEvent(m2);
        })  
        .then(() => {
            return storage.addKeyEvent(k1);
        }) 
        .then(() => {
            return storage.addKeyEvent(k2);
        }) 
        .then(() => {
            return upload.sendCollectedEvents("meta", true)
                .then((result) => {
                    let data = JSON.parse(result);
                    expect(data.session).to.equal("sid");
                    expect(data.metadata).to.equal("meta");
                    expect(data.mouseEvents).to.deep.equal([m1, m2]);
                    expect(data.keyUpDownEvents).to.deep.equal([k1, k2]);
                });
        }) 
    }); 
});