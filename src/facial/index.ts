import { showPopup } from "./popup";
import { getSession } from "./../session/session";
import {
  enrollFace as enrollFaceApi,
  authenticateFace as authenticateFaceApi,
} from "./../api/api";
import { setLabel } from "./popup";
import { api } from "./../api";

/**
 * [[include:facial-module.md]]
 */
export namespace facial {

  /**
   * Error codes used when recording fails
   */
  export enum RecordingError {
    /**
     * User closed popup.
     */
    PopupClosed = 0,

    /**
     * Recording is not supported by browser
     */
    NotSupported = -1,

    /**
     * No recording device is present
     */
    NoDevice = -2
  }

  /**
   * Displays face recording poup.
   * @return Return promise which resolves to string array with base64 encoded video recording 
   */
  export function recordFaceVideo(): Promise<string[]> {
    return showPopup();
  }

  /**
   * Face enrollment
   * @param data recording created using [[recordFaceVideo]]
   * @param serialize flag to return serialised request instead of performing API call
   * @return Returns promise, which resolves to:
   * * string with API request body if serialize flag was set to true
   * * [[FacialEnrollmentResponse]] if serialize flag was set to false and call succeeded.
   * * [[EnrollErrorResponse]] on error.
   */
  export function enrollWithData(data: string[], serialize?: false): Promise<string> | Promise<api.FacialEnrollmentResponse> | Promise<api.EnrollErrorResponse> {
    return new Promise((resolve, reject) => {
      const session = getSession();
      if (!session) {
        reject(new Error("Session must be set before calling this function."));
      }
      if (serialize) {
        resolve(enrollFaceApi(session.sessionId, data).serialize());
      } else {
        enrollFaceApi(session.sessionId, data).send().then((result) => {
          resolve(result);
        });
      }
    });
  }

  /**
   * Face authentication
   * @param data recording created using [[recordFaceVideo]]
   * @param serialize flag to return serialised request instead of performing API call
   * @return Returns promise, which resolves to:
   * * string with API request body if serialize flag was set to true
   * * [[FacialEnrollmentResponse]] if serialize flag was set to false and call succeeded.
   * * [[EnrollErrorResponse]] on error.
   */
  export function authenticateWithData(data: string[], serialize?: false): Promise<string> | Promise<api.FacialEnrollmentResponse> | Promise<api.EnrollErrorResponse> {
    return new Promise((resolve, reject) => {
      const session = getSession();
      if (!session) {
        reject(new Error("Session must be set before calling this function."));
      }
      if (serialize) {
        resolve(authenticateFaceApi(session.sessionId, data).serialize());
      } else {
        resolve(authenticateFaceApi(session.sessionId, data).send());
      }
    });
  }

  /**
   * Displays face authentication poup and authenticate if video is recorded.
   * @param serialize flag to return serialised request instead of performing API call
   * @return Returns promise, which resolves to:
   * * string with API request body if serialize flag was set to true
   * * [[AuthenticationResponse]] if serialize flag was set to false and call succeeded.
   * * [[AuthenticationErrorResponse]] on error.
   */
  export function authenticate(serialize?: false): Promise<string> | Promise<api.AuthenticationResponse> | Promise<api.AuthenticationErrorResponse> {
    return showPopup().then((result) => {
      return new Promise((resolve, reject) => {
        const session = getSession();
        if (!session) {
          reject(new Error("Session must be set before calling this function."));
        }
        if (serialize) {
          resolve(authenticateFaceApi(session.sessionId, result).serialize());
        } else {
          resolve(authenticateFaceApi(session.sessionId, result).send());
        }
      });
    });
  }

  /**
   * Set top label in recording popup.
   */
  export function setTopLabel(label: string) {
    setLabel("aimbrain-facial-top-label", label);
  }

  /**
   * Set bottom label in recording  popup.
   */
  export function setBottomLabel(label: string) {
    setLabel("aimbrain-facial-bottom-label", label);
  }

  /**
   * Set label which is shown when recording is started.
   */
  export function setRecordingLabel(label: string) {
    setLabel("aimbrain-facial-capturing-label", label);
  }

  /**
   * Set timer label which is shown when face recording is started.
   * Use {s} pattern inside the label to show timer value anywhere in label.
   * If {s} is not present in label timer value will be appended at the end of label.
   */
  export function setTimerLabel(label: string) {
    setLabel("aimbrain-facial-timer-label", label);
  }
}
