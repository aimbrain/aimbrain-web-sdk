import * as object from "../util/object";

export enum DialogEvent {
    CloseClicked = 0,
    RecordClicked = 1,
    StopClicked = 2
}

export type DialogOptions = {
    headerText?: string; 
    capturingText?: string;
    progressStartText?: string;
    progressTimerText?: string; 
};

require("./res/popup.css");
const dialogHtml = require("./res/popup.html");

function appendHtml(element: Node, html): HTMLElement {
    const temporary = document.createElement("div");
    temporary.innerHTML = html;
    return element.appendChild(temporary.firstChild) as HTMLElement;
}

let dialogElement: HTMLElement;
let dialogOptions: DialogOptions;

function el(cls: string): Element {
    if (dialogElement) {
        return dialogElement.getElementsByClassName(cls)[0]
    }
    return null;
}

export function open(eventCallback: (event: DialogEvent) => void, tokenText: string, options?: DialogOptions) {
    console.log('open voice ui');

    if (options == null) {
        options = {}
    }

    dialogOptions = object.defaults(options, <DialogOptions>{       
        headerText: "",
        capturingText: "",
        progressStartText: "",
        progressTimerText: ""
    });

    if (!dialogElement) {
        dialogElement = appendHtml(document.body, dialogHtml);        
    
        el("aimbrain-voice-close").addEventListener("click", (event) => {
            eventCallback(DialogEvent.CloseClicked);
        });
 
        el("aimbrain-voice-record-button").addEventListener("click", (event) => {
            eventCallback(DialogEvent.RecordClicked);
        });

        el("aimbrain-voice-stop-button").addEventListener("click", (event) => {
            eventCallback(DialogEvent.StopClicked);
        });
    }

    el("aimbrain-voice-token").innerHTML = tokenText;
    showProgress(false);
}

export function showProgress(status: false | string) {
    if (status === false) {
        el("aimbrain-voice-header-label").innerHTML = dialogOptions.headerText;
        el("aimbrain-voice-capturing-label").innerHTML = "";
        el("aimbrain-voice-progress-label").innerHTML = dialogOptions.progressStartText;    
    }
    else {
        el("aimbrain-voice-header-label").innerHTML = "";
        el("aimbrain-voice-capturing-label").innerHTML = dialogOptions.capturingText;
        let progress = dialogOptions.progressTimerText.replace("{s}", status);
        el("aimbrain-voice-progress-label").innerHTML = progress;        
    }
    
    (<any>el("aimbrain-voice-record-button")).style.display = status === false ? "block" : "none";
    (<any>el("aimbrain-voice-stop-button")).style.display = status === false ? "none" : "block";
}

export function close() {
    if (dialogElement) {
        console.log('close voice ui');
        dialogElement.parentNode.removeChild(dialogElement);
        dialogElement = null;
        dialogOptions = null;
    }
}
