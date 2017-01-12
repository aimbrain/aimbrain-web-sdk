import { facial } from "./";
import * as facialLib from "./facial";
export * from "./facial";

const popupHtml = require("./popup.html");
const labels: string[] = [];
require("./popup.css");

function appendHtml(element: Node, html): HTMLElement {
  const temporary = document.createElement("div");
  temporary.innerHTML = html;
  return element.appendChild(temporary.firstChild) as HTMLElement;
}

let element: HTMLElement;
let timerIntervalId: number;

export function showPopup(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (!element) {
      element = appendHtml(document.body, popupHtml);
      facialLib.initVideo().then(() => {
        element.style.display = "block";
        const closeElement = element.getElementsByClassName("aimbrain-facial-close")[0];
        const recordElement = element.getElementsByClassName("aimbrain-facial-record-button")[0];
        const stopElement = element.getElementsByClassName("aimbrain-facial-stop-button")[0];
        const topLabel = element.getElementsByClassName("aimbrain-facial-top-label")[0];
        const bottomLabel = element.getElementsByClassName("aimbrain-facial-bottom-label")[0];
        const capturingLabel = element.getElementsByClassName("aimbrain-facial-capturing-label")[0];
        const timerLabel = element.getElementsByClassName("aimbrain-facial-timer-label")[0];
        closeElement.addEventListener("click", (event) => {
          hidePopup();
          // closed
          reject(facial.RecordingError.PopupClosed);
        });
        recordElement.addEventListener("click", (event) => {
          (<any>recordElement).style.display = "none";
          (<any>stopElement).style.display = "block";
          (<any>topLabel).style.display = "none";
          (<any>bottomLabel).style.display = "none";
          (<any>capturingLabel).style.display = "block";
          (<any>timerLabel).style.display = "block";
          if (facialLib.isVideoSupported()) {
            startTimer();
            facialLib.captureVideo().then((result) => {
              hidePopup();
              resolve(result);
            });
          } else if (facialLib.isImagingSupported()) {
            startTimer();
            facialLib.captureImages().then((result) => {
              hidePopup();
              resolve(result);
            });
          } else {
            // unsupported
            hidePopup();
            reject(facial.RecordingError.NotSupported);
          }
        });
        stopElement.addEventListener("click", (event) => {
          (<any>stopElement).style.display = "none";
          (<any>recordElement).style.display = "block";
          (<any>topLabel).style.display = "block";
          (<any>bottomLabel).style.display = "block";
          (<any>capturingLabel).style.display = "none";
          (<any>timerLabel).style.display = "none";
          stopStream();
        });
        for (let key in labels) {
          if (labels.hasOwnProperty(key)) {
            element.getElementsByClassName(key)[0].innerHTML = labels[key];
          }
        }
        if (!labels["aimbrain-facial-timer-label"]) {
          labels["aimbrain-facial-timer-label"] = timerLabel.innerHTML;
        }
      }).catch((e) => {
        // no device
        hidePopup();
        reject(facial.RecordingError.NoDevice);
        console.log(e);
      });
    }
  });
}

function startTimer() {
  if (labels["aimbrain-facial-timer-label"].search("{s}") !== -1) {
    element.getElementsByClassName("aimbrain-facial-timer-label")[0].innerHTML = labels["aimbrain-facial-timer-label"].replace("{s}", Math.round(facialLib.recordingDuration/1000));
  } else {
    element.getElementsByClassName("aimbrain-facial-timer-label")[0].innerHTML = labels["aimbrain-facial-timer-label"] + Math.round(facialLib.recordingDuration/1000);
  }
  timerIntervalId = setInterval(function () {
    const currentTime = Date.now();
    if (facialLib.recordingStarted !== 0
      && facialLib.recordingStarted + facialLib.recordingDuration >= currentTime) {
      const timeLeft = Math.round((facialLib.recordingDuration - (currentTime - facialLib.recordingStarted)) / 1000);
      if (labels["aimbrain-facial-timer-label"].search("{s}") !== -1) {
        element.getElementsByClassName("aimbrain-facial-timer-label")[0].innerHTML = labels["aimbrain-facial-timer-label"].replace("{s}", timeLeft);
      } else {
        element.getElementsByClassName("aimbrain-facial-timer-label")[0].innerHTML = labels["aimbrain-facial-timer-label"] + timeLeft;
      }
    }
    if (facialLib.recordingStarted + facialLib.recordingDuration < currentTime && timerIntervalId) {
      if (labels["aimbrain-facial-timer-label"].search("{s}") !== -1) {
        element.getElementsByClassName("aimbrain-facial-timer-label")[0].innerHTML = labels["aimbrain-facial-timer-label"].replace("{s}", "0");
      } else {
        element.getElementsByClassName("aimbrain-facial-timer-label")[0].innerHTML = labels["aimbrain-facial-timer-label"] + "0";
      }
      clearInterval(timerIntervalId);
    }
  }, 1000);
}

export function hidePopup() {
  if (element) {
    stopStream();
    element.parentNode.removeChild(element);
    element = null;
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
  }
}

function stopStream() {
  try {
    facialLib.videoStream.getTracks().forEach((track) => {
      track.stop();
    });
  } catch (e) {
    console.log(e);
  }
}

export function setLabel(divClass: string, text: string) {
  labels[divClass] = text;
  if (element) {
    element.getElementsByClassName(divClass)[0].innerHTML = text;
  }
}
