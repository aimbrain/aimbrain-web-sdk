import test from "ava";
import { Promise } from "../src/promise";
import * as promise from "../src/promise";

test("should be autodetectable", (t) => {
  // There is a global Promise object by default
  const target = Function("return this")().Promise;
  t.truthy(Promise);
  t.is(Promise, target);
  t.is(promise.getPromiseContructor(), target);
});

test("contructor should be settable", (t) => {
  // Set promise to something else
  const something: any = {};
  promise.setPromiseContructor(something);
  t.is(Promise, something);
  t.is(promise.getPromiseContructor(), something);
});
