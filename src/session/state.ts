import * as browser from "./../util/env/browser";
import { global } from "./../util/env/global";
import { Promise } from "./../util/promise";
import { api } from "./../api";

export class Session implements api.SessionResult {
    userId: string;
    session: string;
    face: api.EnrollmentStatus;
    voice: api.EnrollmentStatus;
    behaviour: api.EnrollmentStatus;

    constructor(userId: string, session: string, behaviour: api.EnrollmentStatus, face: api.EnrollmentStatus, voice: api.EnrollmentStatus) {
        this.userId = userId;
        this.session = session;
        this.behaviour = behaviour;
        this.face = face;
        this.voice = voice;
    }

    getId() {
        return this.session;
    }

    isBehaviouralEnrolled() {
        return this.behaviour === api.EnrollmentStatus.Enrolled;
    }

    isBehaviouralBuilding() {
        return this.behaviour === api.EnrollmentStatus.Building;
    }

    isFacialEnrolled() {
        return this.face === api.EnrollmentStatus.Enrolled;
    }

    isFacialBuilding() {
        return this.face === api.EnrollmentStatus.Building;
    }

    isVoiceEnrolled() {
        return this.voice === api.EnrollmentStatus.Enrolled;
    }

    isVoiceBuilding() {
        return this.voice === api.EnrollmentStatus.Building;
    }
}

const sessionKey = "aimbrain_session";
const scoreKey = "aimbrain_score";
const storage: Storage = global.sessionStorage;

let cachedSession: Session;
let cachedScore: number;

export function getCachedSessionScore() {
    if (cachedScore) {
        return cachedScore;
    }
    let serialized;
    serialized = storage.getItem(scoreKey);
    if (serialized) {     
        cachedScore = parseFloat(serialized);
        return cachedScore;
    }
    return null;
}

export function setCachedSessionScore(score: number) {
    cachedScore = score;
    storage.setItem(scoreKey, score.toString());
}

export function getCachedSession(): Session {
    if (cachedSession) {
        return cachedSession;
    }
    let serialized;
    if (storage) {
        serialized = storage.getItem(sessionKey);
    }
    if (serialized) {     
        const { userId, sessionId, behaviour, face, voice } = JSON.parse(serialized);
        cachedSession = new Session(userId, sessionId, behaviour, face, voice);
        return cachedSession;
    }
    return null;
}

export function setCachedSession(session: Session) {
    cachedSession = session;
    if (storage) {
        let serialized = JSON.stringify({
            userId: session.userId,
            sessionId: session.session,
            face: session.face,
            voice: session.voice,
            behaviour: session.behaviour
        }); 
        storage.setItem(sessionKey, serialized);
    }
}

export function clearCache() {
    cachedSession = null;
    cachedScore = null;
    if (storage) {
        storage.removeItem(sessionKey);
        storage.removeItem(scoreKey);
    }
}
