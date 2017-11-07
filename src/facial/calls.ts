import * as browser from "./../util/env/browser";
import { Promise } from "./../util/promise";
import { api } from "./../api";
import * as state from "./../session/state";

export function enrollWithData(data: string[], metadata?: string, serialize?: false): Promise<api.FacialEnrollmentResult>
export function enrollWithData(data: string[], metadata?: string, serialize?: true): Promise<string>
export function enrollWithData(data: string[], metadata?: string): Promise<api.FacialEnrollmentResult>
export function enrollWithData(data: string[], metadata?: string, serialize?: boolean): Promise<string> | Promise<api.FacialEnrollmentResult> {
    const session = state.getCachedSession();
    if (session == null) {
        return Promise.reject({
            errorCode: api.ErrorCode.NoOpenSession,
            error: "This call requires active session"
        });
    }
    if (serialize) {
        return Promise.resolve(api.enrollFace(session.getId(), data, metadata).serialize());
    } else {
        return api.enrollFace(session.getId(), data, metadata).send(); 
    };
}

export function authenticateWithData(data: string[], metadata?: string, serialize?: false): Promise<api.AuthenticationResult>
export function authenticateWithData(data: string[], metadata?: string, serialize?: true): Promise<string>
export function authenticateWithData(data: string[], metadata?: string): Promise<api.AuthenticationResult>
export function authenticateWithData(data: string[], metadata?: string, serialize?: boolean): Promise<string> | Promise<api.AuthenticationResult> {
    const session = state.getCachedSession();
    if (session == null) {
        return Promise.reject({
            errorCode: api.ErrorCode.NoOpenSession,
            error: "This call requires active session"
        });
    }
    if (serialize) {
        return Promise.resolve(api.authenticateFace(session.getId(), data, metadata).serialize());
    } else {
        return api.authenticateFace(session.getId(), data, metadata).send()
            .then((result) => {
                state.setCachedSessionScore(result.score);
                return result;
            });
    };
}