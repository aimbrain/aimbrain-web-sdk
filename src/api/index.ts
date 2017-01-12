import { setApiKey  } from "./api";
import { setBaseUrl as setApiBaseUrl } from "./request";

/**
 * [[include:api-module.md]]
 */
export namespace api {

 /**
   * Sets server url to be used for API calls.
   * Must be called before any API call is invoked.
   * @param url server url
   */
  export function setBaseUrl(url: string): void {
      setApiBaseUrl(url);
  } 

  /**
   * Sets Aimbrain API key/secret pair.
   * Must be called before any API call is invoked.
   * @param key api key
   * @param secret api sercret
   */
  export function setKeyAndSecret(key: string, secret: string): void {
      setApiKey(key, secret);
  }

  /**
   * Module enrollment status.
   */
  export enum EnrollmentStatus {
    /**
     * Not enrolled to the module yet.
     */
    NotEnrolled = 0,
    /**
     * Enrolled to module.
     */
    Enrolled = 1,
    /**
     * Biometric template is being built.API user should retry API call after short delay.
     */     
    Building = 2,
  };

  /**
   * API call error code. 
   */
  export enum ErrorCode {
    /**
     * API was called with invalid parameters.
     */
    BadRequest = 400,

    /**
     * Invalid API key or secret used while making API call.
     */
    InvalidKeyOrSignature = 401,

    /**
     * Current session id is not valid.
     */
    InvalidSessionId = 403,

    /**
     * Authorization call failed.
     */
    AuthorizationFailed = 422,

    /**
     * Enrollemnt call failed.
     */
    EnrollmentFailed = 422,

    /**
     * User is not enrolled when call needs finished enrollment.
     */
    NotEnrolledYet = 424,

    /**
     * Internal server error while performing operation.
     */
    ServerError = 500
  };

  /**
   * Response for session creation call.
   */
  export type SessionResponse = {
    /**
     * Session identifier
     */
    session: string;

    /**
     * Behavioural module enrollment status.
     */
    behaviour: EnrollmentStatus.NotEnrolled | EnrollmentStatus.Enrolled;

    /**
     * Facial module enrollment status.
     */
    face:
    EnrollmentStatus.NotEnrolled |
    EnrollmentStatus.Enrolled |
    EnrollmentStatus.Building;

    /**
     * Voice module enrollment status.
     */
    voice:
    EnrollmentStatus.NotEnrolled |
    EnrollmentStatus.Enrolled |
    EnrollmentStatus.Building;
  };

  /**
   * Response for succesfull behavoural event sending call.
   */
  export type BehaviourResponse = {
    /**
     * Current behavioural score.
     */
    score: number;
    /**
     * Behavioural module enrollemtn status.
     */
    status: EnrollmentStatus.NotEnrolled | EnrollmentStatus.Enrolled;
  };

  /**
   * Response for succesfull API authentication call.
   */
  export type AuthenticationResponse = {
    /**
     * Submitted data score
     */
    score: number;
    /**
     * Submitted data liveness
     */
    liveliness: number;
  };

  /**
   * Response for succesfull facial enrollment API call
   */
  export type FacialEnrollmentResponse = {
    /**
     * Number of images / videos enrolled succesfully
     */
    imagesCount: number;
  };

  /**
   * Response for succesfull voice enrollment API call
   */
  export type VoiceEnrollmentResponse = {
    /**
     * Samples enrolled succesfully.
     */
    voiceSamples: number;
  };

  /**
   * Response for succesfull voice token API call
   */
  export type VoiceTokenResponse = {
    /**
     * Voice token
     */
    token: string;
  };

  /**
   * Response for failed session creation API call
   */
  export type SessionErrorResponse = {
    errorCode:
    ErrorCode.BadRequest |
    ErrorCode.InvalidKeyOrSignature |
    ErrorCode.InvalidSessionId |
    ErrorCode.ServerError;
    error: string;
  };

  /**
   * Response for failed behavioural event sending API call
   */
  export type BehaviourErrorResponse = SessionErrorResponse;

  /**
   * Response for failed enrollment API call
   */
  export type EnrollErrorResponse = {
    errorCode:
    ErrorCode.BadRequest |
    ErrorCode.InvalidKeyOrSignature |
    ErrorCode.InvalidSessionId |
    ErrorCode.EnrollmentFailed |
    ErrorCode.ServerError;
    error: string;
  };

  /**
   * Response for failed authentication API call
   */
  export type AuthenticationErrorResponse = {
    errorCode:
    ErrorCode.BadRequest |
    ErrorCode.InvalidKeyOrSignature |
    ErrorCode.InvalidSessionId |
    ErrorCode.AuthorizationFailed |
    ErrorCode.NotEnrolledYet |
    ErrorCode.ServerError;
    error: string;
  };
}
