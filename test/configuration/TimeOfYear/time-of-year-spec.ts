import "mocha";
import * as chai from "chai";

const expect = chai.expect;

import { TimeOfYear } from "../../../src/configuration/time-of-year";

describe("Time Of Year", () => {

    describe("constructor", () => {
        it(" should construct with good data", () => {
            let t = new TimeOfYear(12, 1);
            expect(t.month).to.equal(12);
            expect(t.day).to.equal(1);

            t = new TimeOfYear(2, 28);
            expect(t.month).to.equal(2);
            expect(t.day).to.equal(28);

            t = new TimeOfYear(2, 29);
            expect(t.month).to.equal(2);
            expect(t.day).to.equal(29);

            t = new TimeOfYear(1, 31);
            expect(t.month).to.equal(1);
            expect(t.day).to.equal(31);
        });

        it(" should not construct with bad data", () => {
            expect(() => new TimeOfYear(1, null)).to.throw;
            expect(() => new TimeOfYear(null, 1)).to.throw;

            expect(() => new TimeOfYear(0.2, 1)).to.throw;
            expect(() => new TimeOfYear(1, 0.1)).to.throw;

            expect(() => new TimeOfYear(0, 1)).to.throw;
            expect(() => new TimeOfYear(13, 1)).to.throw;

            expect(() => new TimeOfYear(-1, 1)).to.throw;
            expect(() => new TimeOfYear(1, -1)).to.throw;
        });

    });
});