import { } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { hmacSha256 } from "../../src/util/hmac";
import * as convert from "../../src/util/convert";

const KEYS = [
    "beef706d98aec5f2d3a982885f41c68d8dd8e3bd52083be4e0d7b54f5c524867",
    "70bf4deab48eb32fa4bad0d08701de56b9ef001cfd3059063da7063e4ebb7646",
    "e7c64c8ea7cf5e7de6c1dd7752139526cda4ecb18cb5bf6067932f78024ccd10",
    "d005b2d80c478c6e1bf0e8677ca15424c26d419cffe61464ace7b1100b646116",
    "7cc081fda1a495c57e1c2cc597eaea03ba6569ad3584f5fd86c85f917d06952e",
    "1845741854f7d0f4b69bb65337e58ee2f4774046efa75377ac51e16be3230864",
    "d4a4bf118259ea36d5e593d76300ff2e93aecb6547c35c736848404593b06abd",
    "74bdf3dab050986a72ab5df9cbb759892e189325b8a81bfb6a295cf9a0201915",
    "467998f88dab6f0708b0f91e383db81d934bc992e2093b67f7d1eda6bc5c58d5",
    "ff4f9e0e7686789de3511b87ef5aa14ec6d11bfb0811091e533f808a47d53707",
];

const MESSAGES = [
    "MYOpotMxjhdoqgMtAlmOupsfoo5i3BF1TFIYcYp4aDTCLTlsNYjOXppfo0lo",
    "Daft2wT6Ftj0m9Ock3etLBjZwuFVL61D8jq14Uo6g7tWZiFyATJbNDU5Qa8W",
    "juAUTdSMUQeBcNVTfogcMmLQUhnXuPQOgFRb9mzrhoH1SNkvrsVwxPlGiDUg",
    "eLhVlhcR1tFbKTJ7CctURzCpvVF6R76CdOKHk1PWrPxnQgwda3vj0yMsX57v",
    "XahgmjWj2L587wgJZq1tD1YJ1eZrrLYkemocctkdy319OsRq5t76lvwq0Y6A",
    "J3IOqc0qOCgkYM7KBYS7a0CY3G5gzTcYYz4z687oQKYRHyRwJvKGFw01Lg9d",
    "MOqvqv7dUJzfO8IaozGZKPrJ7Z20C1oJvfuRy7eXNmeIcDG0tH0LtzHKZ3N6",
    "YLbeddS2dU03tCPGRR93ifknsJElj79enWwNx5dwTg0VuPfFTn3q3k4TXTcV",
    "iABFpJ3NtSAWNSGNI0Z1q7ms9kuUsNWenmGwEaBjHrKyGYN8nZAEmnZH5uNg",
    "vKY7NI0JMGcYlHKltjdspi51pDygF4HonIIGLza7hIinmai6w4S8BXZO1y1A",
];

const OUTPUT = [
    "82894e76477bd9aa983ee7ff85870a211fc8a542670a91d0914b833beeb67537",
    "d3c4c65dacae0fc639ad968c737fc85f6b32714d075811938d2e2bca7ea85c44",
    "19b8e5bb4d027e5303f0171f2d6c7faf036e0bf7173b68af391b7a0998d5943a",
    "884ce88c959d32937774a0c0cf71ce9fe0d2e72cacf8792833ded1defeaff43b",
    "6e394a1b091dddab7a5da41978193a69e577e96cbc35221267ec1805cd092beb",
    "50206c19029deb1b899573015005e9fa03756f8bf25f2651ddc2ea0fda8973de",
    "f471db1b1155ac2747624386b376c540bcde624cbf02ca57eb8122ecf28491ee",
    "b8b5da767b9b19f2d06e84932caf6eb1005645ae3d839d4757a6ff88f8abdc76",
    "fbeff9e6ebfd5ae24d7ee6a7062ef20612b38d0c1b7c0d63a016fda25516f980",
    "25d58c049ad4ed0c95137c70e282744e7a1dd456ab4e1568291f56dfc4e4c2bd",
];

const LENGTH = KEYS.length;

describe("hmac with pre-defined values", () => {
    for (let i = 0; i < KEYS.length; i++) {
        const key = KEYS[i];
        const message = MESSAGES[i];
        const output = OUTPUT[i];

        it('hmac value', () => {
            expect(hmacSha256(key, message)).to.equal(output)
        });
    }
});
