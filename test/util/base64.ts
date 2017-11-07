import { } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as base64 from "../../src/util/base64";

const INPUT = [
    "",
    "MYOpotMxjhdoqgMtAlmOupsfoo5i3BF",
    "Daft2wT6Ftj0m9Ock3etLBjZwuFVL61D",
    "juAUTdSMUQeBcNVTfogcMmLQUhnXuPQOg",
    "eLhVlhcR1tFbKTJ7CctURzCpvVF6R76CdO",
    "XahgmjWj2L587wgJZq1tD1YJ1eZrrLYkemo",
    "J3IOqc0qOCgkYM7KBYS7a0CY3G5gzTcYYz4z",
    "MOqvqv7dUJzfO8IaozGZKPrJ7Z20C1oJvfuRy",
    "YLbeddS2dU03tCPGRR93ifknsJElj79enWwNx5",
    "iABFpJ3NtSAWNSGNI0Z1q7ms9kuUsNWenmGwEaB",
    "vKY7NI0JMGcYlHKltjdspi51pDygF4HonIIGLza7",
];

const OUTPUT_STRING = [
    "",
    "TVlPcG90TXhqaGRvcWdNdEFsbU91cHNmb281aTNCRg==",
    "RGFmdDJ3VDZGdGowbTlPY2szZXRMQmpad3VGVkw2MUQ=",
    "anVBVVRkU01VUWVCY05WVGZvZ2NNbUxRVWhuWHVQUU9n",
    "ZUxoVmxoY1IxdEZiS1RKN0NjdFVSekNwdlZGNlI3NkNkTw==",
    "WGFoZ21qV2oyTDU4N3dnSlpxMXREMVlKMWVacnJMWWtlbW8=",
    "SjNJT3FjMHFPQ2drWU03S0JZUzdhMENZM0c1Z3pUY1lZejR6",
    "TU9xdnF2N2RVSnpmTzhJYW96R1pLUHJKN1oyMEMxb0p2ZnVSeQ==",
    "WUxiZWRkUzJkVTAzdENQR1JSOTNpZmtuc0pFbGo3OWVuV3dOeDU=",
    "aUFCRnBKM050U0FXTlNHTkkwWjFxN21zOWt1VXNOV2VubUd3RWFC",
    "dktZN05JMEpNR2NZbEhLbHRqZHNwaTUxcER5Z0Y0SG9uSUlHTHphNw==",
];

describe('base64', () => {
    for (let i = 0; i < INPUT.length; i++) {
        const input = INPUT[i];
        const output = OUTPUT_STRING[i];

        it('encode value', () => {
            expect(base64.encode(input)).to.be.equal(output);
        });

        it('decode value to default', () => {
            expect(base64.decode(output)).to.be.equal(input);
        });

        it('decode value to string', () => {
            expect(base64.decode(output, false)).to.be.equal(input);
        });
    }
});