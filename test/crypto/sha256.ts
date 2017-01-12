import test from "ava";
import { sha256 } from "../../src/crypto";

const INPUT = [
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

const LENGTH = INPUT.length;

test("test with pre-defined values", (t) => {
  for (let i = 0; i < LENGTH; i++) {
    const input = INPUT[i];
    const output = OUTPUT[i];
    t.is(sha256(input), output);
  }
});
