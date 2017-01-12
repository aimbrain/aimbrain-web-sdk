import { createSession, getSession as getSessionObject, setSession, destroySession, Session } from "./session";
import { api } from "./../api";

/**
 * [[include:session-module.md]]
 */
export namespace session {
   
    /**
     * Create new session. Session must be created before making any other API call requiring session.
     * @param userId unique user identifier
     * @param serialize flag to return serialised request instead of performing API call
     * @return Returns promise, which resolves to:
     * * string with API request body if serialize flag was set to true
     * * [[SessionResponse]] if serialize falg was set to false.
     * * [[SessionErrorResponse]] on error.
     */
    export function establishSession(userId: string, serialize?: false): Promise<string> | Promise<api.SessionResponse> | Promise<api.SessionErrorResponse> {
        if (serialize) {
            return createSession(userId, null, serialize);
        } else {
            return createSession(userId, null, serialize).then((result) => {
                return Promise.resolve(result.res);
            }).catch((result) => { Promise.reject(result); });
        }
    }

    /**
     * Sets current session identifier. Call does not invoke any API request and is meant 
     * to be used with request serailization.
     * @param userId unique user identifier
     * @param sessionId sessionId to be used in serialized requests
     */ 
    export function setExistingSession(userId: string, sessionId: string) {
        return setSession(new Session(userId, sessionId, api.EnrollmentStatus.Enrolled, api.EnrollmentStatus.Enrolled, api.EnrollmentStatus.Enrolled));
    }

    /**
     * Clears current session
     */ 
    export function clearSession() {
        destroySession();
    }

    /**
     * @return Returns true if session was established
     */
    export function isSessionActive(): boolean {
        if (getSessionObject()) {
            return true;
        }
        return false;
    }

    /**
     * @return Returns current session identifier or null if there is no active session. 
     */
    export function getSessionId(): string | null {
        if (getSessionObject()) {
            return getSessionObject().sessionId;
        }
        return null;
    }

    /**
     * @return Returns true if current session completed behavioural enrollment. 
     */
    export function isBehaviouralEnrolled() {
        return getSessionObject().isBehaviouralEnrolled();
    }

    /**
     * @return Returns true if current session is currently building behavioural template. 
     */
    export function isBehaviouralBuilding() {
        return getSessionObject().isBehaviouralBuilding();
    }

    /**
     * @return Returns true if current session completed facial enrollment. 
     */
    export function isFacialEnrolled() {
        return getSessionObject().isFacialEnrolled();
    }

    /**
     * @return Returns true if current session is currently building face template. 
     */
    export function isFacialBuilding() {
        return getSessionObject().isFacialBuilding();
    }

    /**
     * @return Returns true if current session completed voice enrollment. 
     */
    export function isVoiceEnrolled() {
        return getSessionObject().isVoiceEnrolled();
    }

    /**
     * @return Returns true if current session is currently building voice template. 
     */
    export function isVoiceBuilding() {
        return getSessionObject().isVoiceBuilding();
    }
}
