import { Request, setBaseHeader } from "./request";
import { hmacSha256, base64Encode } from "../crypto";
import { defaults } from "../util";
export { Request, setBaseHeader };
import { api } from "./";

let apiKey: string;
let apiSecret: string;

/**
 * Set API key and Secret used to sign all SDK requests to  servers.
 * @param key API key to be set
 * @param secret API secret to be set
 */
export function setApiKey(key: string, secret: string) {
  setBaseHeader("X-aimbrain-apikey", key);
  apiKey = key;
  apiSecret = secret;
}

/**
 * Signs API request. Signing is doen by adding HTTP header `X-aimbrain-signature` to a request.  
 * @param req request to be signed 
 */
function signRequest<TRes>(req: Request<TRes>) {
  // HMAC signature message
  const message = [
    req.method.toUpperCase(),
    req.uri.toLowerCase(),
    JSON.stringify(req.body),
  ].join("\n");
  // Generate the signature
  const signature = base64Encode(hmacSha256(apiSecret, message, true));
  // Add a signature header
  req.headers["X-aimbrain-signature"] = signature;
  return req;
}

/**
 * Make request to create new session.
 * @param userId user identifier
 * @param browserName used browser name
 * @param browserOS operating system used
 * @param screenWidth screen width
 * @param screenHeight screen height
 * @return Created request object
 */
export function createSession(userId, browserName, browserOS,
  screenHeight, screenWidth, metadata?) {
  const payload: any = {
    userId,
    device: browserName,
    system: browserOS,
    screenHeight,
    screenWidth,
  };
  if (metadata) {
    payload.metadata = metadata;
  }
  const req = new Request<api.SessionResponse>({
    method: "post",
    uri: "/v1/sessions",
    body: payload,
  });
  return signRequest(req);
}

/**
 * Make request to send collected behavioural events.
 * @param sessionId session identifier
 * @param events events to be sent
 * @return Created request object
 */
export function sendEvents(sessionId, events: Array<Object>) {
  const payload: any = {
    session: sessionId,
  };
  defaults(payload, events);
  const request = new Request<api.BehaviourResponse>({
    method: "post",
    uri: "/v1/behavioural",
    body: payload,
  });
  return signRequest(request);
}

/**
 * Make request to retrieve voice token.
 * @param sessionId session identifier
 * @param tokenType token type
 * @param metadata metadata string to be sent with the request
 * @return Created request object
 */
export function getVoiceChallenge(sessionId, tokenType, metadata?) {
  const payload: any = {
    session: sessionId,
    tokentype: tokenType,
  };
  if (metadata) {
    payload.metadata = metadata;
  }
  const req = new Request<api.VoiceTokenResponse>({
    method: "post",
    uri: "/v1/voice/token",
    body: payload,
  });
  return signRequest(req);
}

/**
 * Make request to send voice recording for enrollment.
 * @param sessionId session identifier
 * @param samples recorded voice data array encoded as base64 string.
 * @param metadata metadata string to be sent with the request
 * @return Created request object
 */
export function enrollVoice(sessionId, samples: string[], metadata?) {
  const payload: any = {
    session: sessionId,
    voices: samples,
  };
  if (metadata) {
    payload.metadata = metadata;
  }
  const req = new Request<api.VoiceEnrollmentResponse>({
    method: "post",
    uri: "/v1/voice/enroll",
    body: payload,
  });
  return signRequest(req);
}

/**
 * Make request to send voice recording for authentication.
 * @param sessionId session identifier
 * @param samples recorded voice data array encoded as base64 string.
 * @param metadata metadata string to be sent with the request
 * @return Created request object
 */
export function authenticateVoice(sessionId, samples: string[], metadata?) {
  const payload: any = {
    session: sessionId,
    voices: samples,
  };
  if (metadata) {
    payload.metadata = metadata;
  }
  const req = new Request<api.AuthenticationResponse>({
    method: "post",
    uri: "/v1/voice/auth",
    body: payload,
  });
  return signRequest(req);
}

/**
 * Make request to send face video for enrollment.
 * @param sessionId session identifier
 * @param samples recorded video data array encoded as base64 string.
 * @param metadata metadata string to be sent with the request
 * @return Created request object
 */
export function enrollFace(sessionId, data: string[], metadata?) {
  const payload: any = {
    session: sessionId,
    faces: data,
  };
  if (metadata) {
    payload.metadata = metadata;
  }
  const req = new Request<api.FacialEnrollmentResponse>({
    method: "post",
    uri: "/v1/face/enroll",
    body: payload,
  });
  return signRequest(req);
}

/**
 * Make request to send face video for authentication.
 * @param sessionId session identifier
 * @param samples recorded video data array encoded as base64 string.
 * @param metadata metadata string to be sent with the request
 * @return Created request object
 */
export function authenticateFace(sessionId, data: string[], metadata?) {
  const payload: any = {
    session: sessionId,
    faces: data,
  };
  if (metadata) {
    payload.metadata = metadata;
  }
  const req = new Request<api.AuthenticationResponse>({
    method: "post",
    uri: "/v1/face/auth",
    body: payload,
  });
  return signRequest(req);
}
