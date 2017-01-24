import { Promise } from "./../promise";

let database: IDBDatabase;

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
  // time event was logged
  t: number;
  // element data-aimbrain-id
  id?: string;
  // number of events logged in last 200ms if event is mouse move
  no?: number;
  // button identifier if event is mouse up/down
  btn?: number;
}

export interface KeyUpDownEvent {
  // time event was logged
  t: number;
  // key identifier
  key: string;
  // direction up/down
  dir: KeyDirection;
  // element id
  id?: string;
};

function getIndexedDB(): Promise<IDBDatabase> {
  if (database) {
    return Promise.resolve(database);
  }
  return new Promise((resolve, reject) => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const dbRequest = window.indexedDB.open("aimbrain-web", 1);
      dbRequest.onsuccess = function (evt) {
        database = this.result;
        resolve(this.result);
      };
      dbRequest.onerror = function (evt) {
        reject(evt);
        // console.error("openDb:", evt.error);
        // TODO fallback - store in memory
      };
      dbRequest.onupgradeneeded = function (evt) {
        const dbRequest = <IDBOpenDBRequest>evt.currentTarget;
        var mouseEvents = dbRequest.result.createObjectStore("mouseEvents", { autoIncrement: true });
        mouseEvents.createIndex("by_timestamp",  "t");
        var keyUpDownEvents = dbRequest.result.createObjectStore("keyUpDownEvents", { autoIncrement: true });
        keyUpDownEvents.createIndex("by_timestamp",  "t");
      };
    });
  });
}

export function addMouseEvent(event: MouseEvent) {
  return add("mouseEvents", event);
}

export function addKeyUpDownEvent(event: KeyUpDownEvent) {
  return add("keyUpDownEvents", event);
}

function add(objectStore: string, object: Object) {
  return getIndexedDB().then((result) => {
      const transaction = result.transaction(objectStore, "readwrite");
      transaction.onerror = function (evt) {
        console.log("tx error");
      };
      const addRequest = transaction
        .objectStore(objectStore)
        .add(object);
      addRequest.onsuccess = function (event) {
        return new Promise((resolve, reject) => {
          resolve(true);
        });
      };
      addRequest.onerror = function (event) {
        console.log("failed to add");
      };
    })
    .catch((e) => {
      console.log(e);
    });
}

export function removeStoredEvents(mouseEvents: Array<MouseEvent>, keyUpDownEvents: Array<KeyUpDownEvent>) {
  return getIndexedDB().then((database) => {
    const transaction = database.transaction(["mouseEvents", "keyUpDownEvents"], "readwrite");   

    if (mouseEvents.length > 0) {
      var timeFrom = mouseEvents[0].t;
      var timeTo = mouseEvents[mouseEvents.length - 1].t;
      console.log("Remove mouse events from " + timeFrom + " to " + timeTo);

      var mouseEventsStore = transaction.objectStore("mouseEvents");
      var mouseEventsIndex = mouseEventsStore.index("by_timestamp");
      var mouseCursor = mouseEventsIndex.openKeyCursor(IDBKeyRange.bound(timeFrom, timeTo, false, false));
      mouseCursor.addEventListener("success", (e) => {
          const cursor: IDBCursor = (<IDBRequest>e.target).result;
          if (cursor) {
              mouseEventsStore.delete(cursor.primaryKey);
              cursor.continue();
          }
      });
    }
    
    if (keyUpDownEvents.length > 0) {
      var timeFrom = keyUpDownEvents[0].t;
      var timeTo = keyUpDownEvents[keyUpDownEvents.length - 1].t;
      console.log("Remove key events from " + timeFrom + " to " + timeTo);

      var keyEventsStore = transaction.objectStore("keyUpDownEvents");
      var keyEventsIndex = keyEventsStore.index("by_timestamp");
      var keyCursor = keyEventsIndex.openKeyCursor(IDBKeyRange.bound(timeFrom, timeTo, false, false));
      keyCursor.addEventListener("success", (e) => {
          const cursor: IDBCursor = (<IDBRequest>e.target).result;
          if (cursor) {
              keyEventsStore.delete(cursor.primaryKey);
              cursor.continue();
          }
      });
    }
  }).catch((e) => console.log(e));
}

export function getStoredEvents() : Promise<[Array<MouseEvent>, Array<KeyUpDownEvent>]> {
  return getIndexedDB().then((database) => {
      const transaction = database.transaction(["mouseEvents", "keyUpDownEvents"], "readonly");
      
      const moveEvents: Array<MouseEvent> = [];
      const keyUpDownEvents: Array<KeyUpDownEvent> = [];
      let eventGroupsRetrived = 0;
     
      return new Promise((resolve, reject) => {
        const mouseEventsRequest = transaction.objectStore("mouseEvents").openCursor();
        
        mouseEventsRequest.addEventListener("success", (e) => {
          const cursor: IDBCursor = (<IDBRequest>e.target).result;
          if (cursor) {
            moveEvents.push((<IDBCursorWithValue>cursor).value as MouseEvent);
            cursor.continue();
          } else {
            eventGroupsRetrived++;
            if (eventGroupsRetrived === 2) {
              resolve([moveEvents, keyUpDownEvents]);
            }
          }
        });
        const keyUpDownEventsRequest = transaction.objectStore("keyUpDownEvents").openCursor();
       
        keyUpDownEventsRequest.addEventListener("success", (e) => {
          const cursor: IDBCursor = (<IDBRequest>e.target).result;
          if (cursor) {
            keyUpDownEvents.push((<IDBCursorWithValue>cursor).value as KeyUpDownEvent);
            cursor.continue();
          } else {            
            eventGroupsRetrived++;
            if (eventGroupsRetrived === 2) {
              resolve([moveEvents, keyUpDownEvents]);
            }
          }
        });
      });
    }).catch((e) => console.log(e));
}

interface IDBCursorWithValue extends IDBCursor {
  readonly value: Object;
}
