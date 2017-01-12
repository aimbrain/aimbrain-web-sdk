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
    const deleteRequest = window.indexedDB.deleteDatabase("aimbrain");
    deleteRequest.onsuccess = function () {
      resolve();
    };
    deleteRequest.onerror = function () {
      resolve();
    };
  })
    .then(() => {
      return new Promise<IDBDatabase>((resolve, reject) => {
        const dbRequest = window.indexedDB.open("aimbrain", 1);
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
          dbRequest.result.createObjectStore("mouseEvents", { autoIncrement: true });
          dbRequest.result.createObjectStore("keyUpDownEvents", { autoIncrement: true });
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
  return getIndexedDB()
    .then((result) => {
      const transaction = result
        .transaction(objectStore, "readwrite");
      transaction.onerror = function (evt) {
        console.log("trans error");
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

export function getStoredEvents() {
  return getIndexedDB()
    .then((database) => {
      const transaction = database
        .transaction(["mouseEvents", "keyUpDownEvents"], "readonly");
      const allEvents = {};
      let eventGroupsRetrived = 0;
      return new Promise((resolve, reject) => {
        const mouseEventsRequest = transaction
          .objectStore("mouseEvents").openCursor();
        const moveEvents = [];
        mouseEventsRequest.addEventListener("success", (e) => {
          const cursor: IDBCursor = (<IDBRequest>e.target).result;
          if (cursor) {
            moveEvents.push((<IDBCursorWithValue>cursor).value);
            cursor.continue();
          } else {
            const clearRequest = database.transaction("mouseEvents", "readwrite").objectStore("mouseEvents").clear();
            clearRequest.addEventListener("success", (e) => {
              allEvents["mouseEvents"] = moveEvents;
              eventGroupsRetrived++;
              if (eventGroupsRetrived === 2) {
                resolve(allEvents);
              }
            });
          }
        });
        const keyUpDownEventsRequest = transaction
          .objectStore("keyUpDownEvents").openCursor();
        const keyUpDownEvents = [];
        keyUpDownEventsRequest.addEventListener("success", (e) => {
          const cursor: IDBCursor = (<IDBRequest>e.target).result;
          if (cursor) {
            keyUpDownEvents.push((<IDBCursorWithValue>cursor).value);
            cursor.continue();
          } else {
            const clearRequest = database.transaction("keyUpDownEvents", "readwrite").objectStore("keyUpDownEvents").clear();
            clearRequest.addEventListener("success", (e) => {
              allEvents["keyUpDownEvents"] = keyUpDownEvents;
              eventGroupsRetrived++;
              if (eventGroupsRetrived === 2) {
                resolve(allEvents);
              }
            });
          }
        });
      });
    }).catch((e) => console.log(e));
}

interface IDBCursorWithValue extends IDBCursor {
  readonly value: Object;
}
