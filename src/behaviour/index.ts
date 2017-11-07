import { getStoredEvents, removeStoredEvents } from "./storage";
import { getCachedSession, getCachedSessionScore } from "./../session/state";
import { api } from "./../api";
import * as dom from "./dom";
import * as storage from "./storage";
import * as upload from "./upload";
import * as tracking from "./tracking";

/**
 * [[include:behaviour-module.md]]
 */
export namespace behaviour {

    /**
     * Represents either single DOM element or DOM element list.
     */
    type OneOrManyHTMLElements = HTMLElement | HTMLElement[] | NodeList;

    /**
     * Check if behavioural module is supported by current browser.
     * @return if behavioural module can be used.
     */
    export function isSupported(): boolean {
        return storage.isSupported();
    }

     /**
     * Sets an identifier to for DOM element. Identifier must be unique.
     * @param aimbrainId identifier string.
     * @param element element to be identified.
     */
    export function setAimbrainId(aimbrainId: string, element: HTMLElement) {
        dom.setElementSdkId(aimbrainId, element);
    }

    /**
     * Marks array or single HTMLElement and its children untrackable (private).
     * @param element element(s) to be marked untrackable.
     */ 
    export function addToUntrackableList(el: OneOrManyHTMLElements) {
        dom.setIgnored(el instanceof HTMLElement ? [el] : el);
    }

    /**
     * Removes array or single HTMLElement from untrackable (private) element list.
     * @param element element(s) to be removed from untrackable list.
     */
    export function removeFromUntrackableList(el: OneOrManyHTMLElements) {
        dom.unsetIgnored(el instanceof HTMLElement ? [el] : el);     
    }

    /**
     * Set salt used for sensitive view id hashing.
     * @param value hexadecimal 128bit string value.
     */
    export function setSensitiveSalt(value: string) {
        dom.setSensitiveSalt(value);
    }

    /**
     * Marks array or single HTMLElement and its children as sensitive.
     * @param element element(s) to be marked sensitive.
     */
    export function addToSensitiveList(el: OneOrManyHTMLElements) {
        dom.setSensitive(el instanceof HTMLElement ? [el] : el);
    }

    /**
     * Removes array or single HTMLElement from sensitive element list.
     * @param element element(s) to be removed from sensitive list.
     */
    export function removeFromSensitiveList(el: OneOrManyHTMLElements) {
        dom.unsetSensitive(el instanceof HTMLElement ? [el] : el);
    }
 
    /**
     * @return Promise resolving to [[SendBehaviourResult]]
     */
    export function sendCollectedEvents(metadata: string, serialize?: false): Promise<api.SendBehaviourResult> 
    /**
     * Get serialised send event api call.
     * @return Promise resolving to API request body serialized to string
     */
    export function sendCollectedEvents(metadata: string, serialize?: true): Promise<string>      
    /**
     * @return Promise resolving to [[SendBehaviourResult]]
     */
    export function sendCollectedEvents(metadata: string): Promise<api.SendBehaviourResult>      
    /**
     * Send collected behavioural events.
     * @param metadata integration specific metadata
     * @param serialize flag to request serialized request body instead of making API call
     */  
    export function sendCollectedEvents(metadata: string, serialize?): Promise<string> | Promise<api.SendBehaviourResult>  {
        return upload.sendCollectedEvents(metadata, serialize);
    }

    /**
     * Clear collected behavioural events.
     */  
    export function clearCollectedEvents()  {
        return storage.clearStoredEvents();
    }

    /**
     * Starts tracking behavioural events.
     */
    export function startTracking() {
        tracking.startTracking();
    }

    /**
     * Stops tracking behavioural events.
     */
    export function stopTracking() {
        tracking.stopTracking();
    }

    /**
     * Recent score.
     * @return Most recent behavioural score received when submitting 
     * behavioural events. This includes calls to [[sendCollectedEvents]] and
     * calls made by background event sending.
     */
    export function getScore(): number {
        return getCachedSessionScore();
    }

    /**
     * Starts invoking [[sendCollectedEvents]] periodically in background.
     * @param interval sending interval in milliseconds. Defaults to 3000
     */
    export function startSending(interval?: number) {
        upload.startBackgroundSending(interval);        
    }

    /**
     * Stops invoking [[sendCollectedEvents]] periodically in background.
     */
    export function stopSending() {
        upload.stopBackgroundSending();
    }

    /**
     * Starts event tracking and background sending.
     * @param interval sending interval in milliseconds. Defaults to 3000
     */
    export function start(interval?: number) {
        startTracking();
        startSending(interval);
    }
}
