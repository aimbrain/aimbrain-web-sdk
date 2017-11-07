import { Promise } from "./../util/promise";
import { api } from "./../api";
import { Session, getCachedSession, setCachedSession, clearCache,  } from "./state";
import * as calls from "./calls";

/**
 * [[include:session-module.md]]
 */
export namespace session {
       
    /**
     * @return Promise resolving to [[SessionResponse]]
     */
    export function establishSession(userId: string, metadata?: string, serialize?: false): Promise<api.SessionResult>;    
    /**
     * @return Promise resolving to string with API request body
     */
    export function establishSession(userId: string, metadata?: string, serialize?: true): Promise<string>; 
    /**
     * Create new session. Session must be created before making any other API call requiring session.
     * @param userId unique user identifier
     * @param metadata integration specific metadata
     * @param serialize flag to request serialized request body instead of making API call
     */   
    export function establishSession(userId: string, metadata?, serialize?): Promise<api.SessionResult> | Promise<string> {
        return calls.createSession(userId, metadata, serialize);
        
    }

    /**
     * Sets current session identifier. Call does not invoke any API request and is meant 
     * to be used with request serialization.
     * @param userId unique user identifier
     * @param sessionId sessionId to be used in serialized requests
     */ 
    export function setExistingSession(userId: string, sessionId: string) {
        return setCachedSession(new Session(userId, sessionId, api.EnrollmentStatus.Enrolled, api.EnrollmentStatus.Enrolled, api.EnrollmentStatus.Enrolled));
    }

    /**
     * Clears current session
     */ 
    export function clearSession() {
        clearCache();
    }

    /**
     * @return True if session was established
     */
    export function isSessionActive(): boolean {
        return getCachedSession() != null;
    }

    /**
     * @return Current session identifier or null if there is no active session. 
     */
    export function getSessionId(): string | null {
        if (getCachedSession()) {
            return getCachedSession().getId();
        }
        return null;
    }

    /**
     * @return True if current session completed behavioural enrollment. 
     */
    export function isBehaviouralEnrolled() {
        let session = getCachedSession();
        return session == null ? false : session.isBehaviouralEnrolled();
    }

    /**
     * @return True if current session is currently building behavioural template. 
     */
    export function isBehaviouralBuilding() {
        let session = getCachedSession();
        return session == null ? false : session.isBehaviouralBuilding();
    }

    /**
     * @return True if current session completed facial enrollment. 
     */
    export function isFacialEnrolled() {
        let session = getCachedSession();
        return session == null ? false : session.isFacialEnrolled();
    }

    /**
     * @return True if current session is currently building face template. 
     */
    export function isFacialBuilding() {
        let session = getCachedSession();
        return session == null ? false : session.isFacialBuilding();
    }

    /**
     * @return True if current session completed voice enrollment. 
     */
    export function isVoiceEnrolled() {
        let session = getCachedSession();
        return session == null ? false : session.isVoiceEnrolled();
    }

    /**
     * @return True if current session is currently building voice template. 
     */
    export function isVoiceBuilding() {
        let session = getCachedSession();
        return session == null ? false : session.isVoiceBuilding();
    }
}
