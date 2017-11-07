import { getCachedSession } from "./../session/state";
import { api } from "./../api";
import * as calls from "./calls";
import * as video from "./video";
import * as recording from "./recording";

/**
 * [[include:facial-module.md]]
 */
export namespace facial {

    /**
     * Face capture mode
     */
    export enum RecordingMode {
        /**
         * Recording captures video.
         */
        Video = 0,

        /**
         * Recording captures image list.
         */
        Images = 1
    }

    /**
     * Check if face module is supported by current browser.
     * @param mode Recording mode to be used
     * @return if face module can be used with supplied mode.
     */
    export function isSupported(mode: RecordingMode): boolean {
        switch (mode) {
            case RecordingMode.Video:
                return video.isVideoSupported();
            case RecordingMode.Images:
                return video.isImagingSupported();
            default:
                return false;
        }
    }

    /**
     * @return Promise resolving to [[FacialEnrollmentResult]].
     */
    export function enrollWithData(data: string[], metadata?: string): Promise<api.FacialEnrollmentResult>;
    /**
     * @return Promise resolving to [[FacialEnrollmentResult]].
     */
    export function enrollWithData(data: string[], metadata: string, serialize: false): Promise<api.FacialEnrollmentResult>
    /**
     * @return Promise resolving to string with API request body
     */
    export function enrollWithData(data: string[], metadata: string, serialize: true): Promise<string>
    /**
     * Face enrollment
     * @param data recording created using [[recordFaceVideo]]
     * @param metadata     
     * @param serialize flag to request serialised API call body instead of performing API call
     */
    export function enrollWithData(data: string[], metadata?: string, serialize?): Promise<api.FacialEnrollmentResult> | Promise<string> {
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
     * @return Promise resolving to string with API request body
     */
    export function authenticateWithData(data: string[], metadata: string, serialize: true): Promise<string>
    /**
     * Face authentication
     * @param data recording created using [[recordFaceVideo]]
     * @param metadata
     * @param serialize flag to request serialised API call body instead of performing API call
     */
    export function authenticateWithData(data: string[], metadata?: string, serialize?): Promise<api.AuthenticationResult> | Promise<string>  {
        return calls.authenticateWithData(data, metadata, serialize);
    }
    
    /**
     * Options for face recording popup
     */
    export type FaceDialogOptions = {
        /**
         * Set top label in recording popup
         */
        headerText?: string;
        
        /**
         * Set bottom label in recording  popup
         */
        hintText?: string;

        /**
         * Set label which is shown when recording is started
         */
        capturingText?: string;
        
         /**
          * Progress text which is shown when face recording is started.
          * Use {s} pattern inside the label to show timer value anywhere in label.
          */
        progressTimerText?: string; 
    };
    

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
        NoDevice = -2,

        /**
         * Error while trying to record
         */        
        UnexpectedError = -3,
    }

    /**
     * Displays face recording popup and records face video.
     * @param options recording dialog display options
     * @return Promise resolving to string array with base64 encoded video recording 
     */
    export function recordFaceVideo(options: FaceDialogOptions): Promise<string[]> {
        return recording.recordFace(options, false);
    }

    /**
     * Displays face recording popup and records face images.
     * @param options recording dialog display options
     * @param imageCount number of images to be recorded
     * @return Promise resolving to string array with base64 encoded recorded images.
     */
    export function recordFaceImages(options: FaceDialogOptions, imageCount: number = 1): Promise<string[]> {
        return recording.recordFace(options, true, imageCount);
    }
}
