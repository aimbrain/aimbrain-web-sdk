import * as dom from "./dom";
import * as storage from "./storage";

const moveEventsGroupingInterval = 100;
let moveGroupCounter = 0;
let moveGroupStartTime = 0;

export let isTracking = false;

function mouseDownListener(event: MouseEvent) {
    const element = <HTMLElement>event.target;
    if (dom.isIgnored(element)) {
        return;
    }
    let sensitive = dom.isSensitive(element);
    const evt: storage.MouseEvent = {
        docx: sensitive ? 0 : event.pageX,
        docy: sensitive ? 0 : event.pageY,
        elx: event.offsetX,
        ely: event.offsetY,
        btn: event.button,
        t: Date.now(),
        type: storage.MouseEventType.DOWN,
        ids: dom.getElementIdChain(element),
    };
    storage.addMouseEvent(evt);
}

function mouseUpListener(event: MouseEvent) {
    const element = <HTMLElement>event.target;
    if (dom.isIgnored(element)) {
        return;
    }
    let sensitive = dom.isSensitive(element);
    const evt: storage.MouseEvent = {
        docx: sensitive ? 0 : event.pageX,
        docy: sensitive ? 0 : event.pageY,
        elx: event.offsetX,
        ely: event.offsetY,
        btn: event.button,
        t: Date.now(),
        type: storage.MouseEventType.UP,
        ids: dom.getElementIdChain(element),
    };
    storage.addMouseEvent(evt);
}

function mouseMoveListener(event: MouseEvent) {
    const element = <HTMLElement>event.target;
    if (dom.isIgnored(element)) {
        return;
    }
    let currentTime = Date.now();
    moveGroupCounter++;
    if (currentTime - moveGroupStartTime < moveEventsGroupingInterval) {
        return;
    }
    let sensitive = dom.isSensitive(element);
    const evt: storage.MouseEvent = {
        docx: sensitive ? 0 : event.pageX,
        docy: sensitive ? 0 : event.pageY,
        elx: event.offsetX,
        ely: event.offsetY,
        t: currentTime,
        no: moveGroupCounter,
        type: storage.MouseEventType.MOVE,
        ids: dom.getElementIdChain(element),
    };
    moveGroupStartTime = currentTime;
    moveGroupCounter = 0;
    storage.addMouseEvent(evt);
}

function keyUpListener(event: KeyboardEvent) {
    const element = <HTMLElement>event.target;
    if (dom.isIgnored(element)) {
        return;
    }
    const evt: storage.KeyEvent = {
        t: Date.now(),
        key: event.key,
        dir: storage.KeyDirection.UP,
        ids: dom.getElementIdChain(element),
    };
    storage.addKeyEvent(evt);
}

function keyDownListener(event: KeyboardEvent) {
    const element = <HTMLElement>event.target;
    if (dom.isIgnored(element)) {
        return;
    }
    const evt: storage.KeyEvent = {
        t: Date.now(),
        key: event.key,
        dir: storage.KeyDirection.DOWN,
        ids: dom.getElementIdChain(element),
    };
    storage.addKeyEvent(evt);
}

function removeListeners() {
    window.removeEventListener("mouseup", mouseUpListener);
    window.removeEventListener("mousedown", mouseDownListener);
    window.removeEventListener("mousemove", mouseMoveListener);
    window.removeEventListener("keyup", keyUpListener);
    window.removeEventListener("keydown", keyDownListener);
}

function addListeners() {
    window.addEventListener("mouseup", mouseUpListener);
    window.addEventListener("mousedown", mouseDownListener);
    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("keyup", keyUpListener);
    window.addEventListener("keydown", keyDownListener);
}

export function startTracking() {
    if (!isTracking) {
        addListeners();
        isTracking = true;  
        console.log('started tracking');     
    }
} 

export function stopTracking() {
    if (isTracking) {
        removeListeners();
        isTracking = false;
        console.log('stopped tracking');
    }
}