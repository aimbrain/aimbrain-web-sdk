import test from "ava";
import * as util from "../../src/crypto/util";

const LENGTH = 5;

const TEST_STRING = [
  "a",
  "ab",
  "abc",
  "abcd",
  "abcde",
  "abcdef",
  "abcdefg",
  "abcdefgh",
];

const TEST_HEX = [
  "61",
  "6162",
  "616263",
  "61626364",
  "6162636465",
  "616263646566",
  "61626364656667",
  "6162636465666768",
];

const TEST_UINT8 = [
  [0x61],
  [0x61, 0x62],
  [0x61, 0x62, 0x63],
  [0x61, 0x62, 0x63, 0x64],
  [0x61, 0x62, 0x63, 0x64, 0x65],
  [0x61, 0x62, 0x63, 0x64, 0x65, 0x66],
  [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67],
  [0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68],
];

const TEST_UINT32 = [
  [0x61000000],
  [0x61620000],
  [0x61626300],
  [0x61626364],
  [0x61626364, 0x65000000],
  [0x61626364, 0x65660000],
  [0x61626364, 0x65666700],
  [0x61626364, 0x65666768],
];

test("type conversions", (t) => {
  for (let i = 0; i < LENGTH; i++) {
    const str = TEST_STRING[i];
    const hex = TEST_HEX[i];
    const uint8 = TEST_UINT8[i];
    const uint32 = TEST_UINT32[i];
    t.deepEqual(util.stringToHex(str), hex);
    t.deepEqual(util.stringToUint8Array(str), uint8);
    t.deepEqual(util.stringToUint32Array(str), uint32);
    t.deepEqual(util.hexToString(hex), str);
    t.deepEqual(util.hexToUint8Array(hex), uint8);
    t.deepEqual(util.hexToUint32Array(hex), uint32);
    t.deepEqual(util.uint8ArrayToString(uint8), str);
    t.deepEqual(util.uint8ArrayToHex(uint8), hex);
    t.deepEqual(util.uint8ArrayToUint32Array(uint8), uint32);
    t.deepEqual(util.uint32ArrayToString(uint32, str.length), str);
    t.deepEqual(util.uint32ArrayToHex(uint32, hex.length / 2), hex);
    t.deepEqual(util.uint32ArrayToUint8Array(uint32, uint8.length), uint8);
  }
});
