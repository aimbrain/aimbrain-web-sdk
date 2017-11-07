import { Promise } from "./../util/promise";
import { api } from "./../api";
import { Session, getCachedSession } from "./../session/state";

export function sendEvents(mouseEvents: Array<Object>, keyEvents: Array<Object>, metadata: string): Promise<api.SendBehaviourResult>;
export function sendEvents(mouseEvents: Array<Object>, keyEvents: Array<Object>, metadata: string, serialize: false): Promise<api.SendBehaviourResult>;
export function sendEvents(mouseEvents: Array<Object>, keyEvents: Array<Object>, metadata: string, serialize: true): Promise<string>;
export function sendEvents(mouseEvents: Array<Object>, keyEvents: Array<Object>, metadata: string, serialize?) {
    const session = getCachedSession();
    if (session == null) {
        return Promise.reject({
            errorCode: api.ErrorCode.NoOpenSession,
            error: "This call requires active session"
        });
    }
    if (serialize) {
        return Promise.resolve(api.sendEvents(session.getId(), mouseEvents, keyEvents, metadata).serialize());
    } else {
        return api.sendEvents(session.getId(), mouseEvents, keyEvents, metadata).send();
    };
}
