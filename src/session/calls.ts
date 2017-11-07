import * as browser from "./../util/env/browser";
import { Promise } from "./../util/promise";
import { api } from "./../api";
import * as state from "./state";

/**
 * Create a user session.
 *
 * Disregards any previously stored sessions and creates a completely new one.
 */ 
export function createSession(userId: string, metadata: string, serialize?: true): Promise<string>;
export function createSession(userId: string, metadata: string, serialize?: false): Promise<api.SessionResult>;
export function createSession(userId: string, metadata: string, serialize?):  Promise<api.SessionResult> | Promise<string>  {
    let request = api.createSession(userId, browser.browserName, browser.browserOS,
        browser.screenHeight, browser.screenWidth, metadata);

    if (serialize) {
        return Promise.resolve(request.serialize());
    }

    return request.then((result) => {
        const session = new state.Session(userId, result.session, result.behaviour, result.face, result.voice);
        state.setCachedSession(session);
        return result;
    });
}

/**
 * Ensure a user session.
 *
 * This function creates a session and caches it in session storage.
 * Next time you call this function with the same userId, it returns the
 * current user session without sending an API request.
 */
export function ensureSessionCreated(userId: string, metadata?: string): Promise<api.SessionResult> {
    const session = state.getCachedSession();
    if (session && session.userId === userId) {
        return Promise.resolve(session);
    }
    return createSession(userId, metadata, false);
}
