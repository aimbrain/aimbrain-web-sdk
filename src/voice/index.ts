import { api } from "./../api";
import * as calls from "./calls";
import * as audio from "./audio";
import * as recording from "./recording";

/**
 * [[include:voice-module.md]]
 */
export namespace voice {

    /**
     * Token names to be used with [[getEnrollmentToken]]
     */
    export type EnrollmentTokenKey = "enroll-1" | "enroll-2" | "enroll-3" | "enroll-4" | "enroll-5";

    /**
     * Check if voice module is supported by current browser.
     * @return if voice module can be used.
     */
    export function isSupported(): boolean {
        return audio.isSupported();
    }

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
    export function getEnrollmentToken(tokenKey: EnrollmentTokenKey, metadata: string, serialize?: boolean): Promise<string> {
        return calls.getEnrollmentChallengeText(tokenKey, metadata, serialize);
    }

    /**
     * @param serialize flag to return serialised request instead of performing API call
     * @return Promise which resolves to: 
     * * string containing authentication token if serialize parameter was false
     * * string with serialized request body if serialize parameter was true
     */
    export function getAuthenticationToken(metadata: string, serialize?: boolean): Promise<string> {
        return calls.getAuthenticationChallengeText(metadata, serialize);
    }
       
    /**
     * @return Promise resolving to [[VoiceEnrollmentResult]].
     */
    export function enrollWithData(data: string[], metadata?: string): Promise<api.VoiceEnrollmentResult>;
    /**
     * @return  Promise resolving to string with API request body.
     */
    export function enrollWithData(data: string[], metadata: string, serialize: true): Promise<string>
    /**
     * Enroll using recorded voice. 
     * @param data recording created using [[recordVoice]]
     * @param serialize flag to request serialised request instead of performing API call
     * @param metadata
     */
    export function enrollWithData(data: string[], metadata?: string, serialize?): Promise<api.VoiceEnrollmentResult> | Promise<string> {
        return calls.enrollWithData(data, metadata, serialize);
    }
    
    /**
     * @return Promise resolving to [[AuthenticationResult]].
     */
    export function authenticateWithData(data: string[], metadata?: string): Promise<api.AuthenticationResult>;
    /**
     * @return Promise resolving to [[AuthenticationResult]].
     */
    export function authenticateWithData(data: string[], metadata: string, serialize: false): Promise<api.AuthenticationResult>
    /**
     * @return  Promise resolving to string with API request body.
     */
    export function authenticateWithData(data: string[], metadata: string, serialize: true): Promise<string>
    /**
     * Voice authentication.
     * @param data recording created using [[recordVoice]]
     * @param serialize flag to request serialised request instead of performing API call
     * @param metadata
     */
    export function authenticateWithData(data: string[], metadata?: string, serialize?): Promise<api.AuthenticationResult> | Promise<string> {
        return calls.authenticateWithData(data, metadata, serialize);
    }

    /**
     * Options for voice recording popup
     */
    export type VoiceDialogOptions = {
        /**
         * Set top label in voice recording popup visible before recording
         */
        helpText?: string;
        
        /**
         * Text shown during capture
         */
        capturingText?: string;
    
        /**
         * Progress text before recording.
         */
        progressStartText?: string;
    
         /**
          * Progress text which is shown when voice recording is started.
          * Use {s} pattern inside the label to show timer value anywhere in label.
          */
        progressTimerText?: string; 
    };
    
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
        NoDevice = -2,

        /**
         * Error while trying to record
         */
        RecordingError = -3,
    }

    /**
     * Displays voice recording poup.
     * @param token voice token shown to user
     * @return Promise resolving to string array with base64 encoded audio recording
     */
    export function recordVoice(token: string, options: VoiceDialogOptions): Promise<string[]> {
        return recording.recordVoice(token, options);
    }
}
