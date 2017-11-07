import { getStoredEvents, removeStoredEvents } from "./storage";
import { api } from "./../api";
import { setCachedSessionScore } from "./../session/state";
import * as calls from "./calls";

export let defaultSendingInterval: number = 3 * 1000;
let sendingIntervalId;
let sending = false;
 
export function sendCollectedEvents(metadata: string, serialize: true): Promise<string>
export function sendCollectedEvents(metadata: string, serialize: false): Promise<api.SendBehaviourResult>
export function sendCollectedEvents(metadata: string, serialize?): Promise<string> | Promise<api.SendBehaviourResult> {
    if (serialize) {
        return getStoredEvents().then((events) => {
            let mouseEvents = events[0];
            let keyEvents = events[1];
            return calls.sendEvents(mouseEvents, keyEvents, metadata, serialize);
        });
    }
    else {
        return getStoredEvents().then((events) => {
            let mouseEvents = events[0];
            if (mouseEvents.length > 0) {
                console.log("Sending mouse events from {0} to {1}", mouseEvents[0].t, mouseEvents[mouseEvents.length - 1].t);
            }
            let keyEvents = events[1];
            if (keyEvents.length > 0) {
                console.log("Sending key events from {0} to {1}", keyEvents[0].t, keyEvents[keyEvents.length - 1].t);
            }
            return calls.sendEvents(mouseEvents, keyEvents, metadata, false)
                .then((result) => {
                    setCachedSessionScore(result.score);
                    removeStoredEvents(mouseEvents, keyEvents);
                    return result;
                });
        });
    }
}

export function startBackgroundSending(interval: number = defaultSendingInterval) {
    if (sending) {
        return;
    }
    console.log("starting background upload");
    sending = true;    
    sendingIntervalId = setInterval(() => {
        console.log("background upload");
        sendCollectedEvents(null, false);
    }, interval);
}

export function stopBackgroundSending() {
    sending = false;
    if (sendingIntervalId) {
        clearInterval(sendingIntervalId);
        sendingIntervalId = null;
        console.log("stopped background upload");
    }
}
