import { Promise } from "../util/promise";
import { global } from "../util/env/global";
import * as wav from "../util/wav";

type getUserMedia = (constraints: MediaStreamConstraints,
    successCallback: NavigatorUserMediaSuccessCallback,
    errorCallback: NavigatorUserMediaErrorCallback) => void;

function dummyGetUserMedia(constraints: MediaStreamConstraints,
    successCallback: NavigatorUserMediaSuccessCallback,
    errorCallback: NavigatorUserMediaErrorCallback) {
    errorCallback(new MediaStreamError());
}

const AudioContext = global.AudioContext || global.webkitAudioContext;
const getUserMedia: getUserMedia = (navigator.getUserMedia
    || (navigator as any).webkitGetUserMedia
    || (navigator as any).mozGetUserMedia
    || dummyGetUserMedia).bind(navigator);

/**
 * Checks whether browser supports audio recording
 */
export function isSupported() {
    return !!(getUserMedia && AudioContext);
}

/**
 * getUserMedia options
 */
const STREAM_OPTIONS = {
    video: false,
    audio: {
        optional: [],
        mandatory: {
            googEchoCancellation: false,
            googAutoGainControl: false,
            googNoiseSuppression: false,
            googHighpassFilter: false,
        },
    },
};

let audioContext: AudioContext;

export function initAudio(): Promise<MediaStream> {
    console.log('init audio');
    if (!isSupported()) {
        const err = new Error("Audio capture is not supported on this platform");
        return Promise.reject(err);
    }
    return new Promise((resolve, reject) => {
        getUserMedia(<MediaStreamConstraints>STREAM_OPTIONS, (stream) => { resolve(stream); }, reject);
    });
}

let recorderCleanup: () => void;
let recorderTimeout: number;

/**
 * Records a sample of specified length in miliseconds
 */
export function recordSample(stream: MediaStream, duration: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
        if (audioContext == null) {
            console.log("new audio context");
            audioContext = new AudioContext();
        }

        // Create an audio stream source
        const source = audioContext.createMediaStreamSource(stream);
        // Create a gain node
        const gain = audioContext.createGain();
        // Create a script processor
        const createScriptProcessor = audioContext.createScriptProcessor
            || (audioContext as any).createJavaScriptNode;
        const processor: ScriptProcessorNode = createScriptProcessor
            .call(audioContext, 2048, 1, 1);

        // Connect nodes
        // [source] -> [gain] -> [processor] -> [context.destination]
        source.connect(gain);
        gain.connect(processor);
        processor.connect(audioContext.destination);

        //  Listen for data
        const samples: number[] = [];
        const audioProcessListener = (e: AudioProcessingEvent) => {
            const channel = e.inputBuffer.getChannelData(0);
            for (let i = 0; i < channel.length; i++) {
                samples.push(channel[i]);
            }
        };
        processor.addEventListener("audioprocess", audioProcessListener);

        recorderCleanup = () => {
            console.log("recorder cleanup");
            stream.getAudioTracks()[0].stop();
            processor.removeEventListener("audioprocess", audioProcessListener);
            processor.disconnect(audioContext.destination);
            gain.disconnect(processor);
            source.disconnect(gain);

            if (audioContext.close) {
                console.log("close audio context");
                audioContext.close();
                audioContext = null;
            }
        }

        recorderTimeout = setTimeout(() => {
            console.log("record time end");
            const blob = wav.encodeWAV(samples, audioContext.sampleRate, 1);
            recorderCleanup();
            recorderCleanup = null;
            recorderTimeout = null;
            resolve(blob);
        }, duration);
    });
}

export function stopRecording() {
    console.log("record stop");
    try {
        if (recorderTimeout) {
            clearTimeout(recorderTimeout);
            recorderTimeout = null;
        }
        if (recorderCleanup) {
            recorderCleanup();
            recorderCleanup = null;
        }
    } catch (e) {
        console.log(e);
    }
}
