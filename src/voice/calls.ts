import * as browser from "./../util/env/browser";
import { Promise } from "./../util/promise";
import { api } from "./../api";
import * as state from "./../session/state";

export function enrollWithData(data: string[], metadata: string, serialize: true): Promise<string>
export function enrollWithData(data: string[], metadata: string, serialize: false): Promise<api.VoiceEnrollmentResult>
export function enrollWithData(data: string[], metadata: string): Promise<api.VoiceEnrollmentResult>
export function enrollWithData(data: string[], metadata: string, serialize?: boolean): Promise<string> | Promise<api.VoiceEnrollmentResult> {
    const session = state.getCachedSession();
    if (session == null) {
        return Promise.reject({
            errorCode: api.ErrorCode.NoOpenSession,
            error: "This call requires active session"
        });
    }
    if (serialize) {
        return Promise.resolve(api.enrollVoice(session.getId(), data, metadata).serialize());
    } else {
        return api.enrollVoice(session.getId(), data, metadata).send(); 
    };
}

export function authenticateWithData(data: string[], metadata: string, serialize: true): Promise<string>
export function authenticateWithData(data: string[], metadata: string, serialize: false): Promise<api.AuthenticationResult>
export function authenticateWithData(data: string[], metadata: string): Promise<api.AuthenticationResult>
export function authenticateWithData(data: string[], metadata: string, serialize?: boolean): Promise<string> | Promise<api.AuthenticationResult> {
    const session = state.getCachedSession();
    if (session == null) {
        return Promise.reject({
            errorCode: api.ErrorCode.NoOpenSession,
            error: "This call requires active session"
        });
    }
    if (serialize) {
        return Promise.resolve(api.authenticateVoice(session.getId(), data, metadata).serialize());
    } else {
        return api.authenticateVoice(session.session, data, metadata).send()
            .then((result) => {
                state.setCachedSessionScore(result.score);
                return result;
            });;
    };
}

export function getEnrollmentChallengeText(token: string, metadata: string, serialize?: boolean): Promise<string> {
    const session = state.getCachedSession();
    if (session == null) {
        return Promise.reject({
            errorCode: api.ErrorCode.NoOpenSession,
            error: "This call requires active session"
        });
    }
    if (serialize) {
        return Promise.resolve(api.getVoiceChallenge(session.getId(), token, metadata).serialize());
    } else {
        return api.getVoiceChallenge(session.getId(), token, metadata).send().then((result) => {
            return Promise.resolve(result.token);
        });
    }
}

export function getAuthenticationChallengeText(metadata: string, serialize?: boolean): Promise<string> {
    const session = state.getCachedSession();
    if (session == null) {
        return Promise.reject({
            errorCode: api.ErrorCode.NoOpenSession,
            error: "This call requires active session"
        });
    }
    if (serialize) {
        return Promise.resolve(api.getVoiceChallenge(session.getId(), "auth", metadata).serialize());
    } else {
        return api.getVoiceChallenge(session.getId(), "auth", metadata).send().then((result) => {
            return Promise.resolve(result.token);
        });
    }
}
