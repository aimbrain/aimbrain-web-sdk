import {
    untrackableElements,
    sensitiveElements,
    addListeners,
    removeListeners,
    sendingInterval,
    sendingIntervalId,
    setIsSending,
    setIsTracking,
    isSending,
    isTracking,
    setSendingIntervalId,
    setSendingInterval as setSendingIntervalInternal,
    score,
    setScore,
    setSensitiveSalt as setSensitiveSaltInternal    
} from "./behaviour";
import { getStoredEvents, removeStoredEvents } from "./storage";
import { sendEvents } from "./../api/api";
import { getSession } from "./../session/session";
import { api } from "./../api";

/**
 * [[include:behaviour-module.md]]
 */
export namespace behaviour {

    /**
     * Represents either single DOM element or DOM element list.
     */
    type HTMLElementMixed = HTMLElement | HTMLElement[];

    /**
     * Marks array or single HTMLElement and its children untrackable (private).
     * @param element element(s) to be marked untrackable.
     */ 
    export function addToUntrackableList(element: HTMLElementMixed) {
        let elements;
        if (element instanceof HTMLElement) {
            elements = [element];
        } else {
            elements = element;
        }
        for (let e of elements) {
            if (element && untrackableElements.indexOf(e) < 0) {
                untrackableElements.push(e);
            }
        }
    }

    /**
     * Removes array or single HTMLElement from untrackable (private) element list.
     * @param element element(s) to be removed from untrackable list.
     */
    export function removeFromUntrackableList(element: HTMLElementMixed) {
        let elements;
        if (element instanceof HTMLElement) {
            elements = [element];
        } else {
            elements = element;
        }
        for (let e of elements) {
            if (element) {
                const index = untrackableElements.indexOf(e);
                if (index > -1) {
                    untrackableElements.splice(index, 1);
                }
            }
        }
    }

    /**
     * Set salt used for sensitive view id hashing.
     * @param value hexadecimal 128bit string value.
     */
    export function setSensitiveSalt(value: string) {
        setSensitiveSaltInternal(value);
    }

    /**
     * Marks array or single HTMLElement and its children as sensitive.
     * @param element element(s) to be marked sensitive.
     */
    export function addToSensitiveList(element: HTMLElementMixed) {
        let elements;
        if (element instanceof HTMLElement) {
            elements = [element];
        } else {
            elements = element;
        }
        for (let e of elements) {
            if (element && sensitiveElements.indexOf(e) < 0) {
                sensitiveElements.push(e);
            }
        }
    }

    /**
     * Removes array or single HTMLElement from sensitive element list.
     * @param element element(s) to be removed from sensitive list.
     */
    export function removeFromSensitiveList(element: HTMLElementMixed) {
        let elements;
        if (element instanceof HTMLElement) {
            elements = [element];
        } else {
            elements = element;
        }
        for (let e of elements) {
            if (element) {
                const index = sensitiveElements.indexOf(e);
                if (index > -1) {
                    sensitiveElements.splice(index, 1);
                }
            }
        }
    }

    /**
     * Starts tracking behavioural events.
     */
    export function startTracking() {
        if (!isTracking) {
            setIsTracking(true);
            addListeners();
        }
    }

    /**
     * Stops tracking behavioural events.
     */
    export function stopTracking() {
        if (isTracking) {
            setIsTracking(false);
            removeListeners();
        }
    }

    /**
     * Sends collected behavioural events to server. Succesfully sent events will be removed from local storage.
     * @param serialize flag to return serialised request instead of performing API call
     * @return Return promise which resolves to:
     * * string with API request body if serialize flag was set to true
     * * [[BehaviourResponse]] if serialize flag was set to false.
     * * [[BehaviourErrorResponse]] on error.
     */
    export function sendCollectedEvents(serialize?: false): Promise<string> | Promise<api.BehaviourResponse> | Promise<api.BehaviourErrorResponse> {
        return getStoredEvents().then((result) => {
            let mouseEvents = result[0];
            if (mouseEvents.length > 0) {
                console.log("Sending mouse events from " + mouseEvents[0].t + " to " + mouseEvents[mouseEvents.length - 1].t);
            }
            let keyUpDownEvents = result[1];
            if (keyUpDownEvents.length > 0) {
                console.log("Sending key events from " + keyUpDownEvents[0].t + " to " + keyUpDownEvents[keyUpDownEvents.length - 1].t);
            }
            return new Promise((resolve, reject) => {
                if (serialize) {
                    resolve(sendEvents(getSession().sessionId, mouseEvents, keyUpDownEvents).serialize());
                } else { 
                    sendEvents(getSession().sessionId, mouseEvents, keyUpDownEvents).send().then((result) => {
                        setScore(result.score);
                        removeStoredEvents(mouseEvents, keyUpDownEvents);
                        resolve(result);
                    });
                }
            });
        }).catch((error) => { console.log(error); });
    }

    /**
     * Starts invoking [[sendCollectedEvents]] periodically in background.
     * @param interval sending interval in milliseconds. Defaults to 3000
     */
    export function startSending(interval?: number) {
        if (!isSending && getSession()) {
            if (interval) {
                setSendingIntervalInternal(interval);
            }
            setIsSending(true);
            setSendingIntervalId(setInterval(function() {
                getStoredEvents().then((result) => {
                    let mouseEvents = result[0];
                    if (mouseEvents.length > 0) {
                        console.log("Sending mouse events from " + mouseEvents[0].t + " to " + mouseEvents[mouseEvents.length - 1].t);
                    }
                    let keyUpDownEvents = result[1];
                    if (keyUpDownEvents.length > 0) {
                        console.log("Sending key events from " + keyUpDownEvents[0].t + " to " + keyUpDownEvents[keyUpDownEvents.length - 1].t);
                    }
                    sendEvents(getSession().sessionId, mouseEvents, keyUpDownEvents).send().then((result) => {
                        setScore(result.score);
                        removeStoredEvents(mouseEvents, keyUpDownEvents);
                    });
                });
            }, sendingInterval));
        } else {
            throw "Establish session before sending events.";
        }
    }

    /**
     * Stops invoking [[sendCollectedEvents]] periodically in background.
     */
    export function stopSending() {
        if (isSending) {
            setIsSending(false);
            clearInterval(sendingIntervalId);
        }
    }

    /**
     * Starts event tracking and background sending.
     * @param interval sending interval in milliseconds. Defaults to 3000
     */
    export function start(interval?: number) {
        startTracking();
        startSending(interval);
    }

    /**
     * Sets an identifier to for DOM element. Identifier must be unique.
     * @param aimbrainId identifier string.
     * @param element element to be identified.
     */
    export function setAimbrainId(aimbrainId: string, element: HTMLElement) {
        element.setAttribute("data-aimbrain-id", aimbrainId);
    }

    /**
     * Recent score.
     * @return Returns most recent behavioural score received when submitting 
     * behavioural events. This includes calls to [[sendCollectedEvents]] and
     * calls made by background event sending.
     */
    export function getScore(): number {
        return score;
    }
}
