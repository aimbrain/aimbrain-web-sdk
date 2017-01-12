import { createSession as createSessionApi } from "./../api/api";
import { browserName, browserOS, screenHeight, screenWidth } from "./../browser";
import { defaults, global } from "./../util";
import { Promise } from "./../promise";
import { api } from "./../api";

// Retrieve a global sessionStorage object
const storage: Storage = global.sessionStorage;

interface SessionConfig {
  session?: string;
  face?: api.EnrollmentStatus;
  behaviour?: api.EnrollmentStatus;
}

export class Session {
  userId: string;
  sessionId: string;
  face: api.EnrollmentStatus;
  voice: api.EnrollmentStatus;
  behaviour: api.EnrollmentStatus;
  isDummy: boolean;

  constructor(userId: string, sessionId: string, face: api.EnrollmentStatus, voice: api.EnrollmentStatus, behaviour: api.EnrollmentStatus, isDummy?: false) {
    this.userId = userId;
    this.sessionId = sessionId;
    this.face = face;
    this.voice = voice;
    this.behaviour = behaviour;
    this.isDummy = isDummy;
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

  serialize(): string {
    const { userId, sessionId, face, voice, behaviour } = this;
    return JSON.stringify({
      userId,
      sessionId,
      face,
      voice,
      behaviour,
    });
  }

  static deserialize(serialized: string) {
    const { userId, sessionId, face, voice, behaviour } = JSON.parse(serialized);
    return new this(userId, sessionId, face, voice, behaviour);
  }

}

// Current active session
let cachedSession: Session;

/**
 * Get the current user session.
 */
export function getSession(): Session {
  if (cachedSession) {
    return cachedSession;
  }
  let serialized;
  if (storage) {
    serialized = storage.getItem("aimbrain_session");
  }
  if (serialized) {
    cachedSession = Session.deserialize(serialized);
  }
  return cachedSession;
}

export function setSession(session: Session) {
  // Set session object locally
  cachedSession = session;
  // Persist session
  if (storage) {
    storage.setItem("aimbrain_session", cachedSession.serialize());
  }
}

/**
 * Destroy the current user session.
 */
export function destroySession() {
  cachedSession = null;
  if (storage) {
    storage.removeItem("aimbrain_session");
  }
}

/**
 * Create a user session.
 *
 * Disregards any previously stored sessions and creates a completely new one.
 */
export function createSession(userId: string, metadata: string, serialize: true): Promise<any>;
export function createSession(userId?: string, metadata?: string, serialize?: false): Promise<any>;
export function createSession(userId?, metadata?, serialize?) {
  // Serialize request instead of sending it.
  const req = createSessionApi(userId, browserName, browserOS,
    screenHeight, screenWidth, metadata);
  if (serialize) {
    return Promise.resolve(req.serialize());
  }
  // Send a request and return a session object.
  return req
    .then((res) => {
      const session = new Session(userId, res.session, res.face, res.voice, res.behaviour);
      setSession(session);
      return {session, res};
    });
}

/**
 * Ensure a user session.
 *
 * This function creates a session and caches it in session storage.
 * Next time you call this function with the same userId, it returns the
 * current user session without sending an API request.
 */
export function ensureSession(userId?: string, metadata?: string): Promise<Session> {
  const session = getSession();
  if (session && session.userId === userId) {
    return Promise.resolve(session);
  }
  return createSession(userId, metadata);
}
