import { global } from "./env/global";

export let Promise: PromiseConstructor;

// Default to a Promise from global space
if (global && global.Promise) {
    Promise = global.Promise;
}

export function getPromiseContructor() {
    return Promise;
}

export function setPromiseContructor(P: PromiseConstructor) {
    Promise = P;
}
