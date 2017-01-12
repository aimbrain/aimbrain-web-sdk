import { global, blobToBase64 } from "../util";
let getUserMedia: (constraints: MediaStreamConstraints, successCallback: NavigatorUserMediaSuccessCallback, errorCallback: NavigatorUserMediaErrorCallback) => void;
let imagesSupported: boolean;
let videoSupported: boolean;
let videoOptions: Object;
export let videoStream: MediaStream;
export let videoElement: HTMLVideoElement;
let canvasElement: HTMLCanvasElement;
const width = 240;
const height = 320;
export const recordingDuration: number = 3000;
export let recordingStarted = 0;


let recordingOptions: Object;

declare var MediaRecorder: any;

if (navigator.getUserMedia) {
  // other
  getUserMedia = navigator.getUserMedia;
  videoOptions = {
    video: true,
    audio: false,
  };
  imagesSupported = true;
} else if ((<any>navigator).mozGetUserMedia) {
  // mozila
  getUserMedia = (<any>navigator).mozGetUserMedia;
  videoOptions = {
    video: true,
    audio: false,
  };
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
    // no encoding, fallback to images
    videoSupported = false;
  }
} else {
  // no MediaRecorder, fallback to images
  videoSupported = false;
}

export function initVideo() {
  return new Promise((resolve, reject) => {
    videoElement = <HTMLVideoElement>document.getElementsByClassName("aimbrain-facial-video")[0];
    canvasElement = <HTMLCanvasElement>document.getElementsByClassName("aimbrain-facial-canvas")[0];
    getUserMedia.call(navigator, videoOptions, function (stream: MediaStream) {
      videoStream = stream;
      videoElement.src = window.URL.createObjectURL(stream);
      resolve();
    }, function (e) {
      reject(e);
    });
  });
}
 
export function isImagingSupported() {
  return imagesSupported;
}

export function isVideoSupported() {
  return videoSupported;
}

export function captureVideo() {
  return new Promise((resolve, reject) => {
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(videoStream, recordingOptions);
    const video: string[] = [];
    recordingStarted = 0;
    mediaRecorder.ondataavailable = function (event) {
      if (recordingStarted === 0) {
        recordingStarted = Date.now();
      }
      if (recordingStarted + recordingDuration <= Date.now()) {
        try {
          mediaRecorder.stop();
        } catch (e) {
        }
        blobToBase64(new Blob(recordedChunks, {
          type: "video/webm",
        })).then((result) => {
          video[0] = result;
          resolve(video);
        });
      }
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    mediaRecorder.start(500);
  });
}

export function captureImages() {
  return new Promise((resolve, reject) => {
    let counter: number = 0;
    const numberOfImages = 5;
    const images: string[] = [];
    const intervalId = setInterval(function () {
      if (counter >= numberOfImages) {
        clearInterval(intervalId);
        resolve(images);
      }
      const srcWidth = videoElement.videoWidth;
      const srcHeight = videoElement.videoHeight;
      const srcAsp = srcWidth / srcHeight;
      const dstAsp = width / height;
      canvasElement.getContext("2d").drawImage(
        videoElement,
        (srcWidth - srcHeight * dstAsp) / 2, 0, srcHeight * dstAsp, srcHeight,
        0, 0, width, height);
      canvasElement.toBlob(function (blob) {
        blobToBase64(blob).then((result) => {
          if (counter > 0) {
            images.push(result);
          }
          counter++;
        });
      }, "image/jpeg", 0.95);
    }, recordingDuration / numberOfImages);
  });
}

