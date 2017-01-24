import * as storage from "./storage";
import { sha256 } from "./../crypto";
import { hexToString } from "./../crypto/util";

export const untrackableElements: HTMLElement[] = [];
export const sensitiveElements: HTMLElement[] = [];
export let sendingInterval: number = 3 * 1000;
let moveEventsCounter = 0;
const moveEventsGroupingInterval = 200;
let lastTimeGrouped = 0;

export let sensitiveSalt: string = "";
export let isTracking = false;
export let isSending = false;
export let sendingIntervalId;
export let score: number = 0;

function mouseUpListener(event: MouseEvent) {
  const element = <HTMLElement>event.target;
  if (isTrackable(element)) {
    let sensitive = isSensitive(element);
    const evt: storage.MouseEvent = {
      docx: sensitive ? 0 : event.pageX,
      docy: sensitive ? 0 : event.pageY,
      elx: event.clientX,
      ely: event.clientY,
      btn: event.button,
      t: Date.now(),
      type: storage.MouseEventType.UP,
      id: getElementId(element),
    };

    storage.addMouseEvent(evt);
  }
}

function mouseDownListener(event: MouseEvent) {
  const element = <HTMLElement>event.target;  
  if (isTrackable(element)) {    
    let sensitive = isSensitive(element);
    const evt: storage.MouseEvent = {
      docx: sensitive ? 0 : event.pageX,
      docy: sensitive ? 0 : event.pageY,
      elx: event.clientX,
      ely: event.clientY,
      btn: event.button,
      t: Date.now(),
      type: storage.MouseEventType.DOWN,
      id: getElementId(element),
    };
    storage.addMouseEvent(evt);
  }
}

function mouseMoveListener(event: MouseEvent) {
  const element = <HTMLElement>event.target;
  let currentTime = Date.now();
  moveEventsCounter++;
  if (currentTime - lastTimeGrouped < moveEventsGroupingInterval) {
    return;
  }
  let sensitive = isSensitive(element);
  const evt: storage.MouseEvent = {
    docx: sensitive ? 0 : event.pageX,
    docy: sensitive ? 0 : event.pageY,
    elx: event.clientX,
    ely: event.clientY,
    t: currentTime,
    no: moveEventsCounter,
    type: storage.MouseEventType.MOVE,
    id: getElementId(element),
  };
  lastTimeGrouped = currentTime;
  moveEventsCounter = 0;
  storage.addMouseEvent(evt);
}

function keyUpListener(event: KeyboardEvent) {
  const element = <HTMLElement>event.target;
  if (isTrackable(element)) {
    const evt: storage.KeyUpDownEvent = {
      t: Date.now(),
      key: event.key,
      dir: storage.KeyDirection.UP,
      id: getElementId(element),
    };
    storage.addKeyUpDownEvent(evt);
  }
}

function keyDownListener(event: KeyboardEvent) {
  const element = <HTMLElement>event.target;
  if (isTrackable(element)) {
    const evt: storage.KeyUpDownEvent = {
      t: Date.now(),
      key: event.key,
      dir: storage.KeyDirection.DOWN,
      id: getElementId(element),
    };
    storage.addKeyUpDownEvent(evt);
  }
}

export function setSensitiveSalt(value: string) {
  sensitiveSalt = value;
}

export function getElementId(element: HTMLElement) {
  if (element.getAttribute("data-aimbrain-id")) {
    if (isSensitive(element)) {
      return sha256(element.getAttribute("data-aimbrain-id") + hexToString(sensitiveSalt));
    } else {
      return element.getAttribute("data-aimbrain-id");
    }
  } else if (element.id) {
    if (isSensitive(element)) {
      return sha256(element.id + hexToString(sensitiveSalt));
    } else {
      return element.id;
    }
  } else {
    return generateId(element);
  }
}

export function generateId(element: HTMLElement, collectedId: string = "") {
  if (element.parentElement) {
    return generateId(element.parentElement, collectedId + element.tagName + getIndexAsSibling(element));
  } else {
    return sha256(collectedId + element.tagName + 0);
  }
}

function getIndexAsSibling(element: Node, index: number = 0) {
  if (element.previousSibling) {
    return getIndexAsSibling(element.previousSibling, index + 1);
  } else {
    return index;
  }
}

export function setSendingInterval(interval: number) {
  sendingInterval = interval;
}

export function removeListeners() {
  window.removeEventListener("mouseup", mouseUpListener);
  window.removeEventListener("mousedown", mouseDownListener);
  window.removeEventListener("mousemove", mouseMoveListener);
  window.removeEventListener("keyup", keyUpListener);
  window.removeEventListener("keydown", keyDownListener);
}

export function addListeners() {
  window.addEventListener("mouseup", mouseUpListener);
  window.addEventListener("mousedown", mouseDownListener);
  window.addEventListener("mousemove", mouseMoveListener);
  window.addEventListener("keyup", keyUpListener);
  window.addEventListener("keydown", keyDownListener);
}

export function setIsTracking(value: boolean) {
  isTracking = value;
}
 
export function setIsSending(value: boolean) {
  isSending = value;
}

export function setSendingIntervalId(id: number) {
  sendingIntervalId = id;
}

function isTrackable(element: HTMLElement) { 
  if (untrackableElements.indexOf(element) >= 0) {
    return false;
  } else if (element.parentElement) {
    return isTrackable(element.parentElement);
  } else {
    return true;
  }
}

function isSensitive(element: HTMLElement) {
  if (sensitiveElements.indexOf(element) >= 0) {
    return true;
  } else if (element.parentElement) {
    return isSensitive(element.parentElement);
  } else {
    return false;
  }
}

export function setScore(s) {
  score = s;
}
