import * as request from './request';

/**
 * [[include:api-module.md]]
 */
export namespace api {

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
         * Biometric template is being built. API user should retry API call after short delay.
         */
        Building = 2,
    };

    /**
     * API call error code. 
     */
    export enum ErrorCode {
        /**
         * Internal error while parsing response.
         */
        UnrecognizedResponse = 1,

        /**
         * The call requires session active session.
         */
        NoOpenSession = 2,

        /**
         * Error while sending request
         */
        RequestError = 3,

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
     * Result for session creation call.
     */
    export type SessionResult = {
        /**
         * Session identifier
         */
        session: string;
 
        /**
         * Behavioural module enrollment status.
         */
        behaviour: 
        EnrollmentStatus.NotEnrolled | 
        EnrollmentStatus.Enrolled |
        EnrollmentStatus.Building;

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
     * Result for succesfull behaviour event sending call.
     */
    export type SendBehaviourResult = {
        /**
         * Current behavioural score.
         */
        score: number;
        /**
         * Behavioural module enrollment status.
         */
        status: EnrollmentStatus.NotEnrolled | EnrollmentStatus.Enrolled;
    };

    /**
     * Result for succesfull API authentication call.
     */
    export type AuthenticationResult = {
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
     * Result for succesfull facial enrollment API call
     */
    export type FacialEnrollmentResult = {
        /**
         * Number of images / videos enrolled succesfully
         */
        imagesCount: number;
    };

    /**
     * Result for succesfull voice enrollment API call
     */
    export type VoiceEnrollmentResult = {
        /**
         * Samples enrolled succesfully.
         */
        voiceSamples: number;
    };

    /**
     * Result for succesfull voice token API call
     */
    export type VoiceTokenResult = {
        /**
         * Voice token
         */
        token: string;
    };

    /**
     * Result for failed API call
     */
    export type ApiCallError = {
        errorCode:
        ErrorCode.UnrecognizedResponse |
        ErrorCode.BadRequest |
        ErrorCode.InvalidKeyOrSignature |
        ErrorCode.InvalidSessionId |
        ErrorCode.ServerError;
        error: string;
    };

    /**
     * Response for failed enrollment API call
     */
    export type EnrollmentError = {
        errorCode:
        ErrorCode.UnrecognizedResponse |
        ErrorCode.NoOpenSession |
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
    export type AuthenticationError = {
        errorCode:
        ErrorCode.UnrecognizedResponse |
        ErrorCode.BadRequest |
        ErrorCode.InvalidKeyOrSignature |
        ErrorCode.InvalidSessionId |
        ErrorCode.AuthorizationFailed |
        ErrorCode.NotEnrolledYet |
        ErrorCode.ServerError;
        error: string;
    };

    /**
    * Sets server url to be used for API calls.
    * Must be called before any API call is invoked.
    * @param url server url
    */
    export function setBaseUrl(url: string): void {
        request.setBaseUrl(url);
    }

    /**
     * Sets Aimbrain API key/secret pair.
     * Must be called before any API call is invoked.
     * @param key api key
     * @param secret api sercret
     */
    export function setKeyAndSecret(key: string, secret: string): void {
        request.setApiCredentials(key, secret);
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
            userId: userId,
            device: browserName,
            system: browserOS,
            screenHeight,
            screenWidth,
        };
        if (metadata) {
            payload.metadata = metadata;
        }
        return request.createRequest<SessionResult>({
            method: "post",
            uri: "/v1/sessions",
            body: payload,
        });
    }

    /**
     * Make request to send collected behavioural events.
     * @param sessionId session identifier
     * @param events events to be sent
     * @param mouseEvents mouse events to be sent
     * @param keyUpDownEvents key events to be sent
     * @return Created request object
     */
    export function sendEvents(sessionId: string, mouseEvents: Array<Object>, keyUpDownEvents: Array<Object>, metadata?) {
        const payload: any = {
            session: sessionId,
            mouseEvents: mouseEvents,
            keyUpDownEvents: keyUpDownEvents
        };
        if (metadata) {
            payload.metadata = metadata;
        }
        return request.createRequest<SendBehaviourResult>({
            method: "post",
            uri: "/v1/behavioural",
            body: payload,
        });
    }

    /**
     * Make request to retrieve voice token.
     * @param sessionId session identifier
     * @param tokenType token type
     * @param metadata metadata string to be sent with the request
     * @return Created request object
     */
    export function getVoiceChallenge(sessionId: string, tokenType, metadata?) {
        const payload: any = {
            session: sessionId,
            tokentype: tokenType,
        };
        if (metadata) {
            payload.metadata = metadata;
        }
        return request.createRequest<VoiceTokenResult>({
            method: "post",
            uri: "/v1/voice/token",
            body: payload,
        });
    }

    /**
     * Make request to send voice recording for enrollment.
     * @param sessionId session identifier
     * @param samples recorded voice data array encoded as base64 string.
     * @param metadata metadata string to be sent with the request
     * @return Created request object
     */
    export function enrollVoice(sessionId: string, samples: string[], metadata?) {
        const payload: any = {
            session: sessionId,
            voices: samples,
        };
        if (metadata) {
            payload.metadata = metadata;
        }
        return request.createRequest<VoiceEnrollmentResult>({
            method: "post",
            uri: "/v1/voice/enroll",
            body: payload,
        });
    }

    /**
     * Make request to send voice recording for authentication.
     * @param sessionId session identifier
     * @param samples recorded voice data array encoded as base64 string.
     * @param metadata metadata string to be sent with the request
     * @return Created request object
     */
    export function authenticateVoice(sessionId: string, samples: string[], metadata?) {
        const payload: any = {
            session: sessionId,
            voices: samples,
        };
        if (metadata) {
            payload.metadata = metadata;
        }
        return request.createRequest<AuthenticationResult>({
            method: "post",
            uri: "/v1/voice/auth",
            body: payload,
        });
    }

    /**
     * Make request to send face video for enrollment.
     * @param sessionId session identifier
     * @param samples recorded video data array encoded as base64 string.
     * @param metadata metadata string to be sent with the request
     * @return Created request object
     */
    export function enrollFace(sessionId: string, data: string[], metadata?) {
        const payload: any = {
            session: sessionId,
            faces: data,
        };
        if (metadata) {
            payload.metadata = metadata;
        }
        return request.createRequest<FacialEnrollmentResult>({
            method: "post",
            uri: "/v1/face/enroll",
            body: payload,
        });
    }

    /**
     * Make request to send face video for authentication.
     * @param sessionId session identifier
     * @param samples recorded video data array encoded as base64 string.
     * @param metadata metadata string to be sent with the request
     * @return Created request object
     */
    export function authenticateFace(sessionId: string, data: string[], metadata?) {
        const payload: any = {
            session: sessionId,
            faces: data,
        };
        if (metadata) {
            payload.metadata = metadata;
        }
        return request.createRequest<AuthenticationResult>({
            method: "post",
            uri: "/v1/face/auth",
            body: payload,
        });
    }
}
