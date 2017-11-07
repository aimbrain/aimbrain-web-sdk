import { } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { setPromiseContructor } from "../../src/util/promise";
import { Promise } from 'es6-promise';

import { global } from "../../src/util/env/global";
import * as storage from "../../src/behaviour/storage";

describe("behaviour storage", () => {
    
    setPromiseContructor(<PromiseConstructor>Promise)
    
    beforeEach(() => {
        storage.dropSdkDB();
    });

    it('supports indexed db', () => {
        expect(storage.getDBFactory()).to.be.not.null;   
    });

    it('creates db stores', () => {
        return storage.getSdkDB().then((database) => {
            let stores = database.objectStoreNames;
            expect(stores.contains("mouseEvents")).to.be.true;
            expect(stores.contains("keyEvents")).to.be.true;            
        });
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

    let m3 = {
        docx: 200,
        docy: 100,
        elx: 20,
        ely: 10,
        t: 30,
        no: 5,
        type: storage.MouseEventType.MOVE,
        id: 'id3',
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

    it('stores mouse event', () => {
        return storage.addMouseEvent(m1).then(() => {
            return getAll<storage.MouseEvent>("mouseEvents").then((events) => {
                expect(events.length).is.equal(1);
                expectMouseEventsEqual(m1, events[0]);
            });      
        }).catch((e) => {
            console.log(e);
        });
    }); 

    it('deletes mouse event', (done) => {
        Promise.resolve().then(() => {
            return storage.addMouseEvent(m1);
        })
        .then(() => {
            return storage.addMouseEvent(m2);
        })  
        .then(() => {
            return storage.addMouseEvent(m3);
        }) 
        .then(() => {
            return storage.removeStoredEvents([m2], []);
        }) 
        .then(() => {
            return getAll<storage.MouseEvent>("mouseEvents").then((events) => {
                    expect(events.length).is.equal(2);
                    expectMouseEventsEqual(m1, events[0]);
                    expectMouseEventsEqual(m3, events[1]);
                    done();
                })
                .catch((e) => {
                    done(e);
                });
        })       
    }); 

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

    let k3 = {
        t: 30,
        key: "c",
        dir: storage.KeyDirection.DOWN,
        id: "id3"
    }

    function expectKeyEventsEqual(a: storage.KeyEvent, b: storage.KeyEvent) {
        expect(a.key).is.equal(b.key);
        expect(a.dir).is.equal(b.dir);
        expect(a.t).is.equal(b.t);
        expect(a.ids).is.deep.equal(b.ids);
    }

    it('stores key event', () => {
        return storage.addKeyEvent(k1).then(() => {
            return getAll<storage.KeyEvent>("keyEvents").then((events) => {
                expect(events.length).is.equal(1);
                expectKeyEventsEqual(events[0], k1);
            });      
        });
    }); 

    it('deletes key event', (done) => {
        Promise.resolve().then(() => {
            return storage.addKeyEvent(k1);
        })
        .then(() => {
            return storage.addKeyEvent(k2);
        })  
        .then(() => {
            return storage.addKeyEvent(k3);
        }) 
        .then(() => {
            return storage.removeStoredEvents([], [k2]);
        }) 
        .then(() => {
            return getAll<storage.KeyEvent>("keyEvents").then((events) => {
                    expect(events.length).is.equal(2);
                    expectKeyEventsEqual(k1, events[0]);
                    expectKeyEventsEqual(k3, events[1]);
                    done();
                })
                .catch((e) => {
                    done(e);
                });
        })       
    }); 

    it('gets events', (done) => {
        Promise.resolve().then(() => {
            return storage.addMouseEvent(m1);
        })
        .then(() => {
            return storage.addKeyEvent(k1);
        }) 
        .then(() => {
            return storage.getStoredEvents().then((events) => {
                let mouse = events[0];
                expect(mouse.length).is.equal(1);
                expectMouseEventsEqual(m1, mouse[0]);
                
                let key = events[1];
                expectKeyEventsEqual(k1, key[0]);
                done();
            })
            .catch((e) => {
                done(e);
            });
        })       
    }); 
});