import { blobToBase64 } from "../util";
import { recordSample, stopStream, isSupported, initAudio } from "./audio";
import { getVoiceChallenge } from "../api/api";
import { getSession } from "../session/session";
import { voice } from "./";
export { isSupported } from "./audio";
let timerIntervalId: number;
let recordingStarted = 0;
const recordingDuration = 5000;

export function getEnrollmentChallengeText(token: string, serialize?: false): Promise<string> {
  if (serialize) {
    return Promise.resolve(getVoiceChallenge(getSession().sessionId, token).serialize());
  } else {
    return getVoiceChallenge(getSession().sessionId, token).send().then((result) => {
      return Promise.resolve(result.token);
    }).catch((error) => console.log(error));
  }
}

export function getAuthenticationChallengeText(serialize?: false): Promise<string> {
  if (serialize) {
    return Promise.resolve(getVoiceChallenge(getSession().sessionId, "auth").serialize());
  } else {
    return getVoiceChallenge(getSession().sessionId, "auth").send().then((result) => {
      return Promise.resolve(result.token);
    }).catch((error) => console.log(error));
  }
}

/**
 * Captures audio and returns a Base64 encoded WAV file
 */
export function capture(stream: MediaStream, duration?: number): Promise<string[]> {
  return recordSample(stream, duration)
    .then((sample) => { return blobToBase64(sample); })
    .then((result) => { return Promise.resolve([result]); });
}

const popupHtml = require("./popup.html");
const labels: Object = new Object();
require("./popup.css");

function appendHtml(element: Node, html): HTMLElement {
  const temporary = document.createElement("div");
  temporary.innerHTML = html;
  return element.appendChild(temporary.firstChild) as HTMLElement;
}

let element: HTMLElement;

export function showPopup(token: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (!element) {
      element = appendHtml(document.body, popupHtml);
      element.getElementsByClassName("aimbrain-voice-token")[0].innerHTML = token;
      const closeElement = element.getElementsByClassName("aimbrain-voice-close")[0];
      const recordElement = element.getElementsByClassName("aimbrain-voice-record-button")[0];
      const stopElement = element.getElementsByClassName("aimbrain-voice-stop-button")[0];
      const topLabel = element.getElementsByClassName("aimbrain-voice-top-label")[0];
      const bottomLabel = element.getElementsByClassName("aimbrain-voice-bottom-label")[0];
      const capturingLabel = element.getElementsByClassName("aimbrain-voice-capturing-label")[0];
      const timerLabel = element.getElementsByClassName("aimbrain-voice-timer-label")[0];
      closeElement.addEventListener("click", (event) => {
        hidePopup();
        reject(voice.RecordingError.PopupClosed);
      });
      recordElement.addEventListener("click", (event) => {
        if (isSupported()) {
          initAudio().then((result) => {
            recordingStarted = Date.now();
            startTimer();
            capture(result, recordingDuration).then((result) => {
              hidePopup();
              resolve(result);
            });
          }).catch((error) => {
            // no device
            hidePopup();
            reject(voice.RecordingError.NoDevice);
            console.log(error);
          });
        } else {
          hidePopup();
          reject(voice.RecordingError.NotSupported);
        }
        (<any>recordElement).style.display = "none";
        (<any>stopElement).style.display = "block";
        (<any>topLabel).style.display = "none";
        (<any>bottomLabel).style.display = "none";
        (<any>capturingLabel).style.display = "block";
        (<any>timerLabel).style.display = "block";
      });
      stopElement.addEventListener("click", (event) => {
        stopStream();
        (<any>stopElement).style.display = "none";
        (<any>recordElement).style.display = "block";
        (<any>topLabel).style.display = "block";
        (<any>bottomLabel).style.display = "block";
        (<any>capturingLabel).style.display = "none";
        (<any>timerLabel).style.display = "none";
      });
      for (let key in labels) {
        if (labels.hasOwnProperty(key)) {
          element.getElementsByClassName(key)[0].innerHTML = labels[key];
        }
      }
      if (!labels["aimbrain-voice-timer-label"]) {
        labels["aimbrain-voice-timer-label"] = timerLabel.innerHTML;
      }
    }
  });
}

function startTimer() {
  if (labels["aimbrain-voice-timer-label"].search("{s}") !== -1) {
    element.getElementsByClassName("aimbrain-voice-timer-label")[0].innerHTML = labels["aimbrain-voice-timer-label"].replace("{s}", Math.round(recordingDuration/1000));
  } else {
    element.getElementsByClassName("aimbrain-voice-timer-label")[0].innerHTML = labels["aimbrain-voice-timer-label"] + Math.round(recordingDuration/1000);
  }

  timerIntervalId = setInterval(function () {
    const currentTime = Date.now();
    if (recordingStarted !== 0
      && recordingStarted + recordingDuration >= currentTime) {
      const timeLeft = Math.round((recordingDuration - (currentTime - recordingStarted)) / 1000);
      if (labels["aimbrain-voice-timer-label"].search("{s}") !== -1) {
        element.getElementsByClassName("aimbrain-voice-timer-label")[0].innerHTML = labels["aimbrain-voice-timer-label"].replace("{s}", timeLeft);
      } else {
        element.getElementsByClassName("aimbrain-voice-timer-label")[0].innerHTML = labels["aimbrain-voice-timer-label"] + timeLeft;
      }
    }
    if (recordingStarted + recordingDuration < currentTime && timerIntervalId) {
      if (labels["aimbrain-voice-timer-label"].search("{s}") !== -1) {
        element.getElementsByClassName("aimbrain-voice-timer-label")[0].innerHTML = labels["aimbrain-voice-timer-label"].replace("{s}", "0");
      } else {
        element.getElementsByClassName("aimbrain-voice-timer-label")[0].innerHTML = labels["aimbrain-voice-timer-label"] + "0";
      }
      clearInterval(timerIntervalId);
    }
  }, 1000);
}

export function hidePopup() {
  if (element) {
    element.parentNode.removeChild(element);
    element = null;
  }
  stopStream();
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
  }
}

export function setLabel(divClass: string, text: string) {
  labels[divClass] = text;
  if (element) {
    element.getElementsByClassName(divClass)[0].innerHTML = text;
  }
}
