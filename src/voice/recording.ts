import { blobToBase64 } from "../util/blob";
import * as audio from "./audio";
import * as ui from "./ui";
import { voice } from "./"; 

export const recordingDuration = 5000;

let timerIntervalId: number;
let recordingStart = 0;

export function recordVoice(token: string, options: any): Promise<string[]> {
    if (!audio.isSupported()) {
        console.log("not supported");
        return Promise.reject(voice.RecordingError.NotSupported);
    }
    return new Promise((resolve, reject) => {
        ui.open((event: ui.DialogEvent) => {
            switch (event) {
                case ui.DialogEvent.CloseClicked:
                    cancelRecording();
                    reject(voice.RecordingError.PopupClosed);
                    break;

                case ui.DialogEvent.RecordClicked:
                    if (audio.isSupported()) {
                        audio.initAudio().then((result) => {
                            recordingStart = Date.now();
                            startProgressTimer();
                            capture(result, recordingDuration).then((result) => {
                                stopProgressTimer();
                                ui.close();
                                resolve(result);
                            }, (e) => { 
                                audio.stopRecording();
                                reject(voice.RecordingError.RecordingError)
                            });
                        }).catch((error) => {
                            cancelRecording();
                            reject(voice.RecordingError.NoDevice);
                            console.log(error);
                        });
                    } else {
                        audio.stopRecording();
                        reject(voice.RecordingError.NotSupported);
                    }
                    break;

                case ui.DialogEvent.StopClicked:
                    cancelRecording();
                    reject(voice.RecordingError.PopupClosed);
                    break;
            }
        }, token, options);
    });
}

/**
 * Captures audio and returns a Base64 encoded WAV file
 */
function capture(stream: MediaStream, duration: number): Promise<string[]> {
    return  audio.recordSample(stream, duration)
        .then((sample) => { return blobToBase64(sample); })
        .then((result) => { return Promise.resolve([result]); });
}
 
function startProgressTimer() {
    ui.showProgress(Math.round(recordingDuration / 1000).toString());
    timerIntervalId = setInterval(function () {
        const currentTime = Date.now();
        if (recordingStart !== 0
            && recordingStart + recordingDuration >= currentTime) {
            const timeLeft = Math.round((recordingDuration - (currentTime - recordingStart)) / 1000);
            ui.showProgress(timeLeft.toString());            
        }

        if (recordingStart + recordingDuration < currentTime && timerIntervalId) {
            ui.showProgress("0");
            clearInterval(timerIntervalId);
        }
    }, 1000);
}

function stopProgressTimer() {
    if (timerIntervalId) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }
}

export function cancelRecording() {
    console.log("cancel recording");
    audio.stopRecording(); 
    stopProgressTimer();
    ui.close();   
}
 
