import { } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as convert from "../../src/util/convert";

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

describe("type conversions", () => {
    for (let i = 0; i < TEST_STRING.length; i++) {
        const str = TEST_STRING[i];
        const hex = TEST_HEX[i];
        const uint8 = TEST_UINT8[i];
        const uint32 = TEST_UINT32[i];

        it('stringToHex', () => {
            expect(convert.stringToHex(str))
                .to.deep.equal(hex)
        });

        it('stringToUint8Array', () => {
            expect(convert.stringToUint8Array(str))
                .to.deep.equal(uint8)
        });

        it('stringToUint32Array', () => {
            expect(convert.stringToUint32Array(str))
                .to.deep.equal(uint32)
        });

        // TODO:
        // it('hexToUint8Array', () => {
        //     expect(convert.hexToUint8Array(str))
        //         .to.deep.equal(uint8)
        // });

        // TODO:
        // it('hexToUint32Array', () => {
        //     expect(convert.hexToUint32Array(str))
        //         .to.deep.equal(uint32)
        // });

        it('uint8ArrayToString', () => {
            expect(convert.uint8ArrayToString(uint8))
                .to.deep.equal(str)
        });

        it('uint8ArrayToHex', () => {
            expect(convert.uint8ArrayToHex(uint8))
                .to.deep.equal(hex)
        });

        it('uint8ArrayToUint32Array', () => {
            expect(convert.uint8ArrayToUint32Array(uint8))
                .to.deep.equal(uint32)
        });

        it('uint32ArrayToString', () => {
            expect(convert.uint32ArrayToString(uint32, str.length))
                .to.deep.equal(str)
        });

        it('uint32ArrayToHex', () => {
            expect(convert.uint32ArrayToHex(uint32, hex.length / 2))
                .to.deep.equal(hex)
        });

        it('uint32ArrayToUint8Array', () => {
            expect(convert.uint32ArrayToUint8Array(uint32, uint8.length))
                .to.deep.equal(uint8)
        });
    }
}); 
