import { stringToUint8Array, uint8ArrayToString } from "./util";

type uint8mixed = string | number[] | Uint8Array;

const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

export function base64Encode(input: uint8mixed): string {
  if (typeof input === "string") {
    input = stringToUint8Array(input);
  }
  let output = "";
  for (let i = 0; i < input.length; ) {
    const chr1 = input[i++];
    const chr2 = input[i++];
    const chr3 = input[i++];
    const enc1 = chr1 >> 2;
    const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    let enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    }
    else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output += BASE64.charAt(enc1) + BASE64.charAt(enc2)
      + BASE64.charAt(enc3) + BASE64.charAt(enc4);
  }
  return output;
}

export function base64Decode(input: string, toUint8: true): number[];
export function base64Decode(input: string, toUint8?: false): string;
export function base64Decode(input, toUint8 = false): uint8mixed {
  const output: number[] = [];
  // Clean up input
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  for (let i = 0; i < input.length; ) {
    const enc1 = BASE64.indexOf(input.charAt(i++));
    const enc2 = BASE64.indexOf(input.charAt(i++));
    const enc3 = BASE64.indexOf(input.charAt(i++));
    const enc4 = BASE64.indexOf(input.charAt(i++));
    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;
    output.push(chr1);
    if (enc3 !== 64) {
      output.push(chr2);
    }
    if (enc4 !== 64) {
      output.push(chr3);
    }
  }
  if (toUint8) {
    return output;
  }
  return uint8ArrayToString(output);
}
