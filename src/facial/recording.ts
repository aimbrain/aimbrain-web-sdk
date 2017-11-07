import * as ui from "./ui";
import { facial as face } from "./";
import * as video from "./video";

export const defaultDuration = 3000;
export const defaultImages = 3;

let timerIntervalId: number;
let recordingStarted = 0;

export function recordFace(options: any, captureImages: boolean, imageCount: number = defaultImages): Promise<string[]> {
    let captureVideo = !captureImages;

    if (captureVideo && !video.isVideoSupported()) {
        console.log("video not supported");
        return Promise.reject(face.RecordingError.NotSupported);
    }

    if (captureImages && !video.isImagingSupported()) {
        console.log("iamges not supported");
        return Promise.reject(face.RecordingError.NotSupported);
    }
    
    return new Promise((resolve, reject) => {
        ui.open((event: ui.DialogEvent) => {
            switch (event) {
                case ui.DialogEvent.CloseClicked:
                    cancelRecording();
                    reject(face.RecordingError.PopupClosed);
                    break;

                case ui.DialogEvent.RecordClicked:
                    if (captureVideo && video.isVideoSupported()) {
                        startProgressTimer(defaultDuration);
                        video.captureVideo(defaultDuration).then((result) => {
                            stopProgressTimer();
                            ui.close();
                            resolve(result);
                        }, (e) => {
                            console.log(e);
                            stopProgressTimer();
                            ui.close();
                            reject(face.RecordingError.UnexpectedError);
                        });
                    }
                    else if (captureImages && video.isImagingSupported()) {
                        let duration = Math.min(imageCount * 1000, defaultDuration);
                        startProgressTimer(duration);
                        video.captureImages(duration, imageCount).then((result) => {
                            stopProgressTimer();
                            ui.close();
                            resolve(result);
                        }, (e) => {
                            console.log(e);
                            stopProgressTimer();
                            ui.close();
                            reject(face.RecordingError.UnexpectedError);
                        });
                    }
                    else {
                        ui.close();
                        reject(face.RecordingError.NotSupported);
                    }
                    break;

                case ui.DialogEvent.StopClicked:
                    cancelRecording();
                    reject(face.RecordingError.PopupClosed);
                    break;
            }
        }, options); 

        video.initVideo(captureVideo, ui.getVideoElement(), ui.getCanvasElement()).then(() => {
            ui.setStatus(ui.DialogStatus.Ready);
        }).catch((e) => {
            console.log(e);
            ui.close();
            reject(face.RecordingError.NoDevice);
        });
    });
}

function startProgressTimer(duration: number) {
    ui.setStatus(ui.DialogStatus.Progress, Math.round(duration / 1000).toString());
    recordingStarted = Date.now();
    timerIntervalId = setInterval(function () {
        const currentTime = Date.now();
        if (recordingStarted !== 0
            && recordingStarted + duration >= currentTime) {
            const timeLeft = Math.round((duration - (currentTime - recordingStarted)) / 1000);
            ui.setStatus(ui.DialogStatus.Progress, timeLeft.toString());            
        }
        if (recordingStarted + duration < currentTime && timerIntervalId) {
            clearInterval(timerIntervalId);
            ui.setStatus(ui.DialogStatus.Progress, "0");            
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
    video.stopRecording(); 
    stopProgressTimer();
    ui.close();   
}
