import { global } from "../../src/util/env/global";
import { Promise } from "./../util/promise";

export enum MouseEventType {
    UP = 0,
    DOWN = 1,
    MOVE = 2,
}

export enum KeyDirection {
    UP = 0,
    DOWN = 1,
}
 
export interface MouseEvent {
    // time event was logged
    t: number;
    // x position in document
    docx: number;
    // y position in document
    docy: number;
    // x position in element
    elx: number;
    // y position in element
    ely: number;
    // type up/down/move
    type: MouseEventType;
    // element data-aimbrain-id
    ids?: string[];
    // number of events logged in last 200ms if event is mouse move
    no?: number;
    // button identifier if event is mouse up/down
    btn?: number;
}

export interface KeyEvent {
    // time event was logged
    t: number;
    // key identifier
    key: string;
    // direction up/down
    dir: KeyDirection;
    // element id
    ids?: string[];
};

interface IDBCursorWithValue extends IDBCursor {
    readonly value: Object;
}

const mouseEventStore = "mouseEvents";
const keyEventStore = "keyEvents";

const dbName = "aimbrain-sdk";
const dbVersion = 1;

let sdkDb: IDBDatabase;

export function isSupported() {
    return getDBFactory() != null;
}

export function getDBFactory(): IDBFactory {
    return global.indexedDB;
}

export function dropSdkDB() {
    if (sdkDb) {
        sdkDb.close();
    }
    sdkDb = null;
    getDBFactory().deleteDatabase(dbName);
}

export function getSdkDB(): Promise<IDBDatabase> {
    if (sdkDb) {
        return Promise.resolve(sdkDb);
    }
    
    return new Promise<IDBDatabase>((resolve, reject) => {
        const openRequest = getDBFactory().open(dbName, dbVersion);
        openRequest.onsuccess = function (evt) {
            sdkDb = this.result;
            sdkDb.onversionchange = function(event) {
                console.log("Version change, closing db");
                if (sdkDb) {
                    sdkDb.close();
                }
                sdkDb = null;
            };
            resolve(sdkDb);
        };
        
        openRequest.onerror = function (evt) {
            reject(evt);
        };

        function upgradeV0toV1(db: IDBDatabase) {
            var mouseEvents = db.createObjectStore(mouseEventStore, { autoIncrement: true });
            mouseEvents.createIndex("by_timestamp", "t");
            var keyEvents = db.createObjectStore(keyEventStore, { autoIncrement: true });
            keyEvents.createIndex("by_timestamp", "t");
        }

        openRequest.onupgradeneeded = function (evt) {
            const dbRequest = <IDBOpenDBRequest>evt.currentTarget;
            const db = dbRequest.result;
            for (let ver = evt.oldVersion; ver <= evt.newVersion; ver++) {
                if (ver == 0) {
                    upgradeV0toV1(db);
                }                
            }
        };
    });
}

export function addMouseEvent(event: MouseEvent): Promise<void> {
    return add(mouseEventStore, event);
}

export function addKeyEvent(event: KeyEvent): Promise<void> {
    return add(keyEventStore, event);
}

function add(objectStore: string, object: Object) {
    return getSdkDB().then((database) => {
        return new Promise<void>((resolve, reject) => {
            const transaction = database.transaction(objectStore, "readwrite");
            
            transaction.oncomplete = function (evt) {
                resolve();
            };

            transaction.onerror = function (evt) {
                reject(event);
            };

            transaction
                .objectStore(objectStore)
                .add(object);    
        });
    });
}

export function removeStoredEvents(mouseEvents: Array<MouseEvent>, keyUpDownEvents: Array<KeyEvent>) {
    return getSdkDB().then((database) => {
        return new Promise<void>((resolve, reject) => {
            const transaction = database.transaction([mouseEventStore, keyEventStore], "readwrite");

            transaction.oncomplete = function (evt) {
                resolve();
            };

            transaction.onerror = function (evt) {
                reject(event);
            };

            function deleteTimeRange(storeName: string, from: Number, to: number) {
                var store = transaction.objectStore(storeName);
                var timestampIndex = store.index("by_timestamp");
                var cursor = timestampIndex.openKeyCursor(IDBKeyRange.bound(from, to, false, false));
                cursor.addEventListener("success", (e) => {
                    const cursor: IDBCursor = (<IDBRequest>e.target).result;
                    if (cursor) {
                        store.delete(cursor.primaryKey);
                        cursor.continue();
                    }
                });
            }

            if (mouseEvents.length > 0) {
                var from = mouseEvents[0].t;
                var to = mouseEvents[mouseEvents.length - 1].t;
                deleteTimeRange(mouseEventStore, from, to);
            }

            if (keyUpDownEvents.length > 0) {
                var from = keyUpDownEvents[0].t;
                var to = keyUpDownEvents[keyUpDownEvents.length - 1].t;
                deleteTimeRange(keyEventStore, from, to);
            }
        });
    });
}

export function getStoredEvents(): Promise<[Array<MouseEvent>, Array<KeyEvent>]> {
    return getSdkDB().then((database) => {
        const transaction = database.transaction([mouseEventStore, keyEventStore], "readonly");

        function getAll<T>(store: string): Promise<Array<T>> {
            return new Promise<Array<T>>((resolve, reject) => {            
                const request = transaction.objectStore(store).openCursor();
                const result: Array<T> = [];
                request.addEventListener("success", (e) => {
                    const cursor: IDBCursor = (<IDBRequest>e.target).result;
                    if (cursor) {
                        result.push((<IDBCursorWithValue>cursor).value as T);
                        cursor.continue();
                    } else {
                        resolve(result);
                    }
                });            
                request.addEventListener("error", (e) => {
                    reject(e);
                });
            });
        }

        return Promise.all([
            getAll<MouseEvent>(mouseEventStore), 
            getAll<KeyEvent>(keyEventStore)
        ]);
    });
}

export function clearStoredEvents() {
    return getSdkDB().then((database) => {
        return new Promise<void>((resolve, reject) => {
            const transaction = database.transaction([mouseEventStore, keyEventStore], "readwrite");

            transaction.oncomplete = function (evt) {
                resolve();
            };

            transaction.onerror = function (evt) {
                reject(event);
            };

            transaction.objectStore(mouseEventStore).clear();
            transaction.objectStore(keyEventStore).clear();
        });
    });
}
