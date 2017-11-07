import { global } from "./global";

/**
 * Browser name
 */
export let browserName: string = "Other";

// Opera 8.0+
const isOpera = (!!global.opr && !!global.opr.addons)
    || !!global.opera
    || navigator.userAgent.indexOf(" OPR/") >= 0;
// Firefox 1.0+
const isFirefox = typeof global.InstallTrigger !== "undefined";
// Safari <= 9 "[object HTMLElementConstructor]"
const isSafari = Object.prototype.toString.call(global.HTMLElement)
    .indexOf("Constructor") > 0;
// Internet Explorer 6-11
const isIE = !!global.document.documentMode;
// Edge 20+
const isEdge = !isIE && !!global.StyleMedia;
// Chrome 1+
const isChrome = !!global.chrome && !!global.chrome.webstore;

if (isOpera) {
    browserName = "Opera";
}
else if (isFirefox) {
    browserName = "Firefox";
}
else if (isEdge) {
    browserName = "Edge";
}
else if (isIE) {
    browserName = "isIE";
}
else if (isChrome) {
    browserName = "Chrome";
}

/**
 * Browser operating system
 */
export let browserOS: string = null;
const userAgent = navigator.appVersion;

if (userAgent.indexOf("Win") >= 0) {
    browserOS = "Windows";
}
else if (userAgent.indexOf("Mac") >= 0) {
    if (userAgent.indexOf("iP") >= 0) {
        browserOS = "iOS";
    } else {
        browserOS = "macOS";
    }
}
else if (userAgent.indexOf("Android") >= 0) {
    browserOS = "Android";
}
else if (userAgent.indexOf("Linux") >= 0) {
    browserOS = "Linux";
}
else if (userAgent.indexOf("X11") >= 0) {
    browserOS = "Unix-like";
}

/**
 * Screen width
 */
export let screenWidth: number = null;

/**
 * Screen height
 */
export let screenHeight: number = null;

if (global.screen) {
    screenWidth = global.screen.availHeight;
    screenHeight = global.screen.availWidth;
}
