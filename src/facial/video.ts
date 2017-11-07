import { global } from "../util/env/global";
import * as blob from "../util/blob";

let getUserMedia: (constraints: MediaStreamConstraints, successCallback: NavigatorUserMediaSuccessCallback, errorCallback: NavigatorUserMediaErrorCallback) => void;

let imagesSupported: boolean;
let videoSupported: boolean;
let recordingOptions: Object;

let videoElement: HTMLVideoElement;
let canvasElement: HTMLCanvasElement;
let videoStream: MediaStream;

const imageWidth = 240;
const imageHeight = 320;

let videoOptionCandidates = [
    true,
    { facingMode: "user", width: {exact: 640}, height: {exact: 360} },
    { facingMode: "user", width: {exact: 352}, height: {exact: 288} },
    { facingMode: "user", width: {exact: 320}, height: {exact: 320} }
];

let imageOptionCandidates = [
    true,
    { facingMode: "user", width: 640, height: 480 }
];

let recordingStarted = 0;
let canvasIntervalId = 0;

declare var MediaRecorder: any;

if (navigator.getUserMedia) {
    // other
    getUserMedia = navigator.getUserMedia;    
    imagesSupported = true;
} else if ((<any>navigator).mozGetUserMedia) {
    // mozila
    getUserMedia = (<any>navigator).mozGetUserMedia;    
    imagesSupported = true;
} else {
    // unsupported
    imagesSupported = false;
}

if (global.MediaRecorder) {
    if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
        recordingOptions = { mimeType: "video/webm; codecs=vp9" };
        videoSupported = true;
    } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
        recordingOptions = { mimeType: "video/webm; codecs=vp8" };
        videoSupported = true;
    } else {
        videoSupported = false; // no encoding, fallback to images
    }
} else {
    videoSupported = false; // no MediaRecorder, fallback to images
}

export function isVideoSupported() {
    return videoSupported;
}

export function isImagingSupported() {
    return imagesSupported;
}


function getUserMediaWithOptions(options: Array<any>, success, failure) {
    let optionCandidates = options.slice(0);

    function initUserMedia() {
        if (optionCandidates.length == 0) {
            failure();
        }
        else {
            let options = {
                video: optionCandidates.pop(),
                audio: false
            }

            getUserMedia.call(navigator, options, function (stream: MediaStream) {
                success(stream);
            }, (e) => {
                console.log('Failed media with options ' + JSON.stringify(options));
                console.log(e);
                initUserMedia();
            });
        }
    } 
    initUserMedia();
} 

export function initVideo(videoCapture: boolean, videoEl: HTMLVideoElement, canvasEl: HTMLCanvasElement) {
    return new Promise((resolve, reject) => {
        videoElement = videoEl;
        canvasElement = canvasEl;
        getUserMediaWithOptions(videoCapture ? videoOptionCandidates : imageOptionCandidates, (stream: MediaStream) => {
            videoStream = stream;
            if (typeof videoElement.srcObject == "object") {
                videoElement.srcObject = stream;
            } else {
                videoElement.src = URL.createObjectURL(stream);
            }
            if (imagesSupported) {
                canvasElement.setAttribute('width', imageWidth.toString());
                canvasElement.setAttribute('height', imageHeight.toString());
            }
            resolve();
        }, () => {
            reject(new Error('Failed to initialize video'));
        });
    });
}

export function captureVideo(duration: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const recordedChunks = [];
        const mediaRecorder = new MediaRecorder(videoStream, recordingOptions);
        const video: string[] = [];
        recordingStarted = 0;
        mediaRecorder.ondataavailable = function (event) {
            if (recordingStarted === 0) {
                recordingStarted = Date.now();
            }
            if (recordingStarted + duration <= Date.now()) {
                try {
                    stopRecording();
                } catch (e) {
                    console.log(e);
                }
                blob.blobToBase64(new Blob(recordedChunks, {
                    type: "video/webm",
                })).then((result) => {
                    video[0] = result;
                    resolve(video);
                });
            }
            else if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorder.start(500);
    });
}

function base64ImageFromCanvas(el: HTMLCanvasElement): Promise<string> {
    return new Promise((resolve, reject) => {
        if (el.toBlob) {
            canvasElement.toBlob((value) => {
                blob.blobToBase64(value).then((result) => {
                    resolve(result);    
                }).catch(reject);
            }, "image/jpeg", 0.95);
        }
        else {
            var dataURL = el.toDataURL("image/jpeg");
            var imageOnly = dataURL.substr(dataURL.indexOf(',') + 1);
            resolve(imageOnly);
        }
    });
}

export function captureImages(duration: number, imageCount: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
        let counter: number = 0;
        const images: string[] = [];
        canvasIntervalId = setInterval(() => {
            function stopAndResolve() {
                clearInterval(canvasIntervalId);
                canvasIntervalId = 0;
                stopRecording();
                resolve(images);
            }

            if (counter >= imageCount) {
                stopAndResolve();
            }
            else {
                try {
                    const srcWidth = videoElement.videoWidth;
                    const srcHeight = videoElement.videoHeight;
                    const srcAsp = srcWidth / srcHeight;
                    const dstAsp = imageWidth / imageHeight;
                    const srcX = (srcWidth - srcHeight * dstAsp) / 2;
                    const srcY = 0;
                    const srcW = srcHeight * dstAsp;
                    let context = canvasElement.getContext("2d");
                    
                    context.drawImage(videoElement,
                        srcX, 
                        srcY, 
                        srcW, 
                        srcHeight,
                        0, 
                        0, 
                        imageWidth, 
                        imageHeight);   
                                             
                    base64ImageFromCanvas(canvasElement).then((result) => {
                        images.push(result);
                        counter++;
                        if (counter >= imageCount) {
                            stopAndResolve();
                        }
                    })
                    .catch(e => {
                        stopRecording();
                        reject(e);
                    });
                }
                catch (e) {
                    stopRecording();
                    reject(e);
                }
            }
        }, duration / imageCount);
    });
}

export function stopRecording() {
    try {
        clearInterval(canvasIntervalId);
        canvasIntervalId = 0;
        videoStream.getTracks().forEach((track) => {
            track.stop();
        });
        videoStream = null; 
        videoElement = null;
        canvasElement = null;        
    } catch (e) {
        console.log(e);
    }
}

