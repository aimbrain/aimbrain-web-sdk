import test from "ava";
import { base64Encode, base64Decode } from "../../src/crypto/base64";

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

const OUTPUT = [
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

const LENGTH = INPUT.length;

test("test with pre-defined values", (t) => {
  for (let i = 0; i < LENGTH; i++) {
    const input = INPUT[i];
    const output = OUTPUT[i];
    t.is(base64Encode(input), output);
    t.is(base64Decode(output), input);
  }
});
