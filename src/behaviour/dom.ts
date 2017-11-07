import sha256 from "./../util/sha256";
import { hexToString } from "./../util/convert";

const idAttribute = "data-aimbrain-id";
const sensitiveAttribute = "data-aimbrain-sensitive";
const ignoredAttribute = "data-aimbrain-ignored";

export let sensitiveSalt: string = "";

export function setSensitiveSalt(value: string) {
    sensitiveSalt = value;
}

export function getElementSdkId(element: HTMLElement) {
    let id = element.getAttribute(idAttribute);

    if (!id) {
        id = element.id;
    }

    if (id && isSensitive(element)) {
        id = sha256(id + hexToString(sensitiveSalt))
    }

    return id ? id : null;
}
 
export function getElementIdChain(element: HTMLElement): string[] {
    let result = [];
    let sensitive = isSensitive(element);
    while (element != null) {
        let id = element.getAttribute(idAttribute);
        if (!id) {
            id = element.id;
        }    
        if (id && sensitive) {
            id = sha256(id + hexToString(sensitiveSalt))
        }
        if (id) {
            result.push(id);
        }
        element = element.parentElement;
    }
    return result;
}

export function setElementSdkId(id: string, element: HTMLElement) {
    element.setAttribute(idAttribute, id);
}

export function isSensitive(element: HTMLElement) {
    if (element.getAttribute(sensitiveAttribute) === "true") {
        return true;
    } else if (element.parentElement) {
        return isSensitive(element.parentElement);
    } else {
        return false;
    }
}

export function setSensitive(elements: HTMLElement[] | NodeList) {
    for (let e of <HTMLElement[]>elements) {
        if (e) {
            e.setAttribute(sensitiveAttribute, "true");
        }
    }
}

export function unsetSensitive(elements: HTMLElement[] | NodeList) {
    for (let e of <HTMLElement[]>elements) {
        if (e) {
            e.removeAttribute(sensitiveAttribute);
        }
    }
}

export function isIgnored(element: HTMLElement) {
    if (element.getAttribute(ignoredAttribute) === "true") {
        return true;
    } else if (element.parentElement) {
        return isIgnored(element.parentElement);
    } else {
        return false;
    }
}

export function setIgnored(elements: HTMLElement[] | NodeList) {
    for (let e of <HTMLElement[]>elements) {
        if (e) {
            e.setAttribute(ignoredAttribute, "true");
        }
    }
}

export function unsetIgnored(elements: HTMLElement[] | NodeList) {
    for (let e of <HTMLElement[]>elements) {
        if (e) {
            e.removeAttribute(ignoredAttribute);
        }
    }
}

