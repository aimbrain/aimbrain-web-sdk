import { } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as object from "../../src/util/object";

interface StringMap {
    [prop: string]: string;
}

describe("defaults", () => {
    it('missing value', () => {
        let source: StringMap = { "a": "1" };
        let target: StringMap = { "b": "2" };

        expect(object.defaults(target, source))
            .to.deep.equal({ "a": "1", "b": "2" })
    });

    it('keep value', () => {
        let source: StringMap = { "a": "1" };
        let target: StringMap = { "a": "2" };

        expect(object.defaults(target, source))
            .to.deep.equal({ "a": "2" })
    }); 
});
