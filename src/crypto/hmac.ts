import { sha256 } from "./sha256";
import { hexToUint8Array, stringToUint8Array, uint8ArrayToHex } from "./util";

type hashFn = (input: number[]) => number[];
type uint8mixed = string | number[];

/**
 * HMAC signature function
 *
 * All parameters with number[] are uint8array
 */
export function hmac(blockSize: number, hashFn: hashFn, key: number[], message: number[]) {
  const blockSizeBytes = blockSize / 8 | 0;
  // Pre-process the key
  if (key.length < blockSizeBytes) {
    // Add zero-padding
    for (let i = key.length; i & blockSizeBytes; i++) {
      key.push(0);
    }
  }
  else if (key.length > blockSizeBytes) {
    // Truncate by applying a hashing function
    key = hashFn(key);
  }
  // Create an outer padding key
  const outerKey: number[] = [];
  for (let i = 0; i < blockSizeBytes; i++) {
    outerKey.push(0x5c ^ key[i]);
  }
  // Create an inner padding key
  const innerKey: number[] = [];
  for (let i = 0; i < blockSizeBytes; i++) {
    innerKey.push(0x36 ^ key[i]);
  }
  // Apply hashing
  return hashFn(outerKey.concat(hashFn(innerKey.concat(message))));
}

/**
 * HMAC with SHA-256
 */
export function hmacSha256(key: uint8mixed, message: uint8mixed, toUint8: true): number[];
export function hmacSha256(key: uint8mixed, message: uint8mixed, toUint8?: false): string;
export function hmacSha256(key, message, toUint8 = false): uint8mixed {
  if (typeof key === "string") {
    key = stringToUint8Array(key);
  }
  if (typeof message === "string") {
    message = stringToUint8Array(message);
  }
  const output = hmac(512, (x) => sha256(x, true), key, message);
  if (toUint8) {
    return output;
  }
  return uint8ArrayToHex(output);
}
