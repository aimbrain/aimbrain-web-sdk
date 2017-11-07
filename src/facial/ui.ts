import * as object from "../util/object";

export enum DialogStatus {
    Initialising = 0,
    Ready = 1,
    Progress = 2,
}

export enum DialogEvent {
    CloseClicked = 0,
    RecordClicked = 1,
    StopClicked = 2
}

export type DialogOptions = {
    headerText?: string; 
    hintText?: string; 
    capturingText?: string; 
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
let dialogReady: boolean
let dialogOptions: DialogOptions;

function el(cls: string): Element {
    if (dialogElement) {
        return dialogElement.getElementsByClassName(cls)[0]
    }
    return null;
}

export function open(eventCallback: (event: DialogEvent) => void, options?: DialogOptions) {
    console.log('open face ui');

    if (options == null) {
        options = {}
    }

    dialogOptions = object.defaults(options, <DialogOptions>{       
        headerText: "", 
        hintText: "", 
        capturingText: "",
        progressTimerText: ""
    });

    if (!dialogElement) {
        dialogElement = appendHtml(document.body, dialogHtml);        
    
        el("aimbrain-face-close").addEventListener("click", (event) => {
            eventCallback(DialogEvent.CloseClicked);
        });
 
        el("aimbrain-face-record-button").addEventListener("click", (event) => {
            if (dialogReady) {
                eventCallback(DialogEvent.RecordClicked);
            }
        });

        el("aimbrain-face-stop-button").addEventListener("click", (event) => {
            eventCallback(DialogEvent.StopClicked);
        });
    }

    dialogReady = false;
    setStatus(DialogStatus.Initialising);
}

export function setStatus(status: DialogStatus, progress?: string) {
    if (dialogElement) {
        switch (status) {
            case DialogStatus.Initialising:
                dialogReady = false;
                (<any>el("aimbrain-face-record-button")).style.display = "none";   
                (<any>el("aimbrain-face-stop-button")).style.display = "none"; 
                el("aimbrain-face-header-label").innerHTML = dialogOptions.headerText;
                el("aimbrain-face-hint-label").innerHTML = dialogOptions.hintText;
                break;
            case DialogStatus.Ready:
                dialogReady = true;
                (<any>el("aimbrain-face-record-button")).style.display = "block";   
                (<any>el("aimbrain-face-stop-button")).style.display = "none"; 
                el("aimbrain-face-header-label").innerHTML = dialogOptions.headerText;
                el("aimbrain-face-hint-label").innerHTML = dialogOptions.hintText;
                break;
            case DialogStatus.Progress:
                dialogReady = true;
                el("aimbrain-face-header-label").innerHTML = "";
                el("aimbrain-face-hint-label").innerHTML = dialogOptions.capturingText;
                let progressText = dialogOptions.progressTimerText.replace("{s}", progress);
                el("aimbrain-face-progress-label").innerHTML = progressText;   
                (<any>el("aimbrain-face-record-button")).style.display = "none";   
                (<any>el("aimbrain-face-stop-button")).style.display = "block";    
                break;    
        }
    }
}

export function getVideoElement(): HTMLVideoElement {
    if (dialogElement) {
        return <HTMLVideoElement>el("aimbrain-face-video");
    }
    else {
        return null;
    }
} 

export function getCanvasElement(): HTMLCanvasElement {
    if (dialogElement) {
        return <HTMLCanvasElement>el("aimbrain-face-canvas");
    }
    else {
        return null;
    }
} 

export function close() {
    console.log('close face ui');
    if (dialogElement) {
        dialogElement.parentNode.removeChild(dialogElement);
        dialogElement = null;
        dialogOptions = null;
    }
}
