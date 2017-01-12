import { showPopup, setLabel } from "./popup";
import { getSession } from "./../session/session";
import { enrollVoice as enrollVoiceApi, authenticateVoice as authenticateVoiceApi } from "./../api/api";
import { api } from "./../api";
import { getEnrollmentChallengeText, getAuthenticationChallengeText } from "./popup";

/**
 * [[include:voice-module.md]]
 */
export namespace voice {

  /**
   * Token names to be used with [[getEnrollmentToken]]
   */
  export type EnrollmentTokenKeys = "enroll-1" | "enroll-2" | "enroll-3" | "enroll-4" | "enroll-5";

  /**
   * All enrollment token keys
   * @returns Returns all enrollment token keys to be used with [[getEnrollmentToken]]
   */
  export function getEnrollmentTokenKeys(): string[] {
    return ["enroll-1", "enroll-2", "enroll-3", "enroll-4", "enroll-5"];
  }

  /**
   * @param tokenKey token key which identifies token
   * @param serialize flag to return serialised request instead of performing API call
   * @return Return promise which resolves to: 
   * * string containing enrollment voice token if serialize parameter was false
   * * string with serialized request body if serialize parameter was true
   */
  export function getEnrollmentToken(tokenKey: EnrollmentTokenKeys, serialize?: false): Promise<string> {
    return getEnrollmentChallengeText(tokenKey, serialize);
  }

  /**
   * @param serialize flag to return serialised request instead of performing API call
   * @return Return promise which resolves to: 
   * * string containing authentication token if serialize parameter was false
   * * string with serialized request body if serialize parameter was true
   */
  export function getAuthenticationToken(serialize?: false): Promise<string> {
    return getAuthenticationChallengeText(serialize);
  }

  /**
   * Error codes used when recording fails
   */
  export enum RecordingError {
    /**
     * Recording popup was closed by user.
     */
    PopupClosed = 0,

    /**
     * Recording is not supported by browser.
     */
    NotSupported = -1,

    /**
     * No recording device is present.
     */
    NoDevice = -2
  }

  /**
   * Displays voice recording poup.
   * @param token voice token shown to user
   * @return Return promise which resolves to string array with base64 encoded audio recording
   */
  export function recordVoice(token: string): Promise<string[]> {
    return showPopup(token);
  }

  /**
   * Voice enrollment.
   * @param data recording created using [[recordVoice]]
   * @param serialize flag to return serialised request instead of performing API call
   * @return Returns promise, which resolves to:
   * * string with API request body if serialize flag was set to true
   * * [[VoiceEnrollmentResponse]] if serialize falg was set to false and call succeeded.
   * * [[EnrollErrorResponse]] on error.
   */
  export function enrollWithData(data: string[], serialize?: false): Promise<string> | Promise<api.VoiceEnrollmentResponse> | Promise<api.EnrollErrorResponse> {
    return new Promise((resolve, reject) => {
      const session = getSession();
      if (!session) {
        reject(new Error("Session must be set before calling this function."));
      }
      if (serialize) {
        resolve(enrollVoiceApi(session.sessionId, data).serialize());
      } else {
        resolve(enrollVoiceApi(session.sessionId, data).send());
      }
    });
  }


  /**
   * Voice authentication.
   * @param data recording created using [[recordVoice]]
   * @param serialize flag to return serialised request instead of performing API call
   * @return Returns promise, which resolves to:
   * * string with API request body if serialize flag was set to true
   * * [[AuthenticationResponse]] if serialize falg was set to false and call succeeded.
   * * [[AuthenticationErrorResponse]] on error.
   */
  export function authenticateWithData(data: string[], serialize?: false, metadata?): Promise<string> | Promise<api.AuthenticationResponse> | Promise<api.AuthenticationErrorResponse> {
    return new Promise((resolve, reject) => {
      const session = getSession();
      if (!session) {
        reject(new Error("Session must be set before calling this function."));
      }
      if (serialize) {
        resolve(authenticateVoiceApi(session.sessionId, data).serialize());
      } else {
        authenticateVoiceApi(session.sessionId, data).send().then((result) => {
          resolve(result);
        });
      }
    });
  }

  /**
   * Set top label in voice recording popup.
   */
  export function setTopLabel(label: string) {
    setLabel("aimbrain-voice-top-label", label);
  }

  /**
   * Set bottom label in voice recording popup.
   */
  export function setBottomLabel(label: string) {
    setLabel("aimbrain-voice-bottom-label", label);
  }

  /**
   * Set label which is shown when voice recording is started.
   */
  export function setRecordingLabel(label: string) {
    setLabel("aimbrain-voice-capturing-label", label);
  }

  /**
   * Set timer label which is shown when voice recording is started.
   * Use {s} pattern inside the label to show timer value anywhere in label.
   * If {s} is not present in label timer value will be appended at the end of label.
   */
  export function setTimerLabel(label: string) {
    setLabel("aimbrain-voice-timer-label", label);
  }
}
