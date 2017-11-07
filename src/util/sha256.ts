import * as convert from "./convert";

type uint8mixed = string | number[];

// Initial hash
const H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
];

// Block coefficients
const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

/**
 * SHA-256 block hasher
 *
 * NOTE: Block size is 512 (0x80)
 */
function sha256Block(block: number[], h: number[]) {
    let tmp: number;
    let a: number;
    let b: number;
    let w = block.slice(0);
    let h0 = h[0];
    let h1 = h[1];
    let h2 = h[2];
    let h3 = h[3];
    let h4 = h[4];
    let h5 = h[5];
    let h6 = h[6];
    let h7 = h[7];

    for (let i = 0; i < 64; i++) {
        if (i < 16) {
            tmp = w[i];
        } else {
            a = w[(i + 1) & 15];
            b = w[(i + 14) & 15];
            tmp = w[i & 15] = ((a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14)
                + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13)
                + w[i & 15] + w[(i + 9) & 15]) | 0;
        }
        tmp += h7
            + (h4 >>> 6 ^ h4 >>> 11 ^ h4 >>> 25 ^ h4 << 26 ^ h4 << 21 ^ h4 << 7)
            + (h6 ^ h4 & (h5 ^ h6)) + K[i];

        h7 = h6;
        h6 = h5;
        h5 = h4;
        h4 = h3 + tmp | 0;
        h3 = h2;
        h2 = h1;
        h1 = h0;
        h0 = (tmp + ((h1 & h2) ^ (h3 & (h1 ^ h2)))
            + (h1 >>> 2 ^ h1 >>> 13 ^ h1 >>> 22 ^ h1 << 30 ^ h1 << 19 ^ h1 << 10)) | 0;
    }

    h[0] = h[0] + h0 | 0;
    h[1] = h[1] + h1 | 0;
    h[2] = h[2] + h2 | 0;
    h[3] = h[3] + h3 | 0;
    h[4] = h[4] + h4 | 0;
    h[5] = h[5] + h5 | 0;
    h[6] = h[6] + h6 | 0;
    h[7] = h[7] + h7 | 0;

    return h;
}

/**
 * SHA-256 hashing function
 *
 * Accepted input:
 *   - plain text
 *   - unsigned 8-bit integer array
 *
 * Output:
 *   - hex-encoded string
 *   - unsigned 8-bit integer array
 */
export default function sha256(input: uint8mixed, toUint8: true): number[];
export default function sha256(input: uint8mixed, toUint8?: false): string;
export default function sha256(input, toUint8 = false): uint8mixed {
    let bytes = input;
    if (typeof input === "string") {
        bytes = convert.stringToUint8Array(input);
    }
    // Save initial length
    const initialLength = bytes.length;
    // Pre-processing: add '1' bit to the end of the message
    bytes.push(0x80);
    // Convert to words
    const words = convert.uint8ArrayToUint32Array(bytes);
    // Pre-processing: Add zero padding
    // NOTE: Leave 64 bits for the "length" (skip 2 iterations)
    for (let i = words.length + 2; i & 0x0f; i++) {
        words.push(0);
    }
    // Pre-processing: Append a 64-bit length
    words.push(initialLength / 0x100000000 | 0);
    words.push(initialLength * 8 | 0);
    // Apply hashing function to all blocks
    let hash = H.slice(0);
    for (let i = 0; i < words.length; i += 0x10) {
        hash = sha256Block(words.slice(i, i + 0x10), hash);
    }
    // Return the result
    if (toUint8) {
        return convert.uint32ArrayToUint8Array(hash);
    }
    return convert.uint32ArrayToHex(hash);
}
