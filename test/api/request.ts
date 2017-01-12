import test from "ava";
import { Request } from "../../src/api/request";

interface TestRes {
  value: number;
}

// Stub the sending method
Request.prototype.send = function () {
  return Promise.resolve({ value: 9000 });
};

// Create a test request
const req = new Request<TestRes>({
  body: { value: 1 },
});

test("should be thenable", (t) => {
  req.then((res) => t.is(res.value, 9000));
});

test("should be sendable", (t) => {
  req.send().then((res) => t.is(res.value, 9000));
});

test("should be sendable only once", (t) => {
  let count = 0;
  const promises = [];
  promises.push(req.then(() => count++));
  for (let i = 0; i < 5; i++) {
    promises.push(req.send());
  }
  Promise
    .all(promises)
    .then(() => t.is(count, 1));
});

test("should be serializable", (t) => {
  const value = req.serialize().value;
  t.is(value, 1);
});
