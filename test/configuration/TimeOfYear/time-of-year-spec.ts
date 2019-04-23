import "mocha";
import * as chai from "chai";

const expect = chai.expect;

import { TimeOfYear } from "../../../src/configuration/time-of-year";

describe("Time Of Year", () => {

    describe("constructor", () => {
        it(" should construct with good data", () => {
            let t = new TimeOfYear({ month: 12, day: 1 });
            expect(t.month).to.equal(12);
            expect(t.day).to.equal(1);

            t = new TimeOfYear({ month: 2, day: 28 });
            expect(t.month).to.equal(2);
            expect(t.day).to.equal(28);

            t = new TimeOfYear({ month: 2, day: 29 });
            expect(t.month).to.equal(2);
            expect(t.day).to.equal(29);

            t = new TimeOfYear({ month: 1, day: 31 });
            expect(t.month).to.equal(1);
            expect(t.day).to.equal(31);
        });

        it(" should not construct with bad data", () => {
            expect(() => new TimeOfYear({ month: 1, day: null })).to.throw;
            expect(() => new TimeOfYear({ month: null, day: 1 })).to.throw;

            expect(() => new TimeOfYear({ month: 0.2, day: 1 })).to.throw;
            expect(() => new TimeOfYear({ month: 1, day: 0.1 })).to.throw;

            expect(() => new TimeOfYear({ month: 0, day: 1 })).to.throw;
            expect(() => new TimeOfYear({ month: 13, day: 1 })).to.throw;

            expect(() => new TimeOfYear({ month: -1, day: 1 })).to.throw;
            expect(() => new TimeOfYear({ month: 1, day: -1 })).to.throw;
        });

        describe("fromDate", () => {
            it(" should construct with good data", () => {
                let t = TimeOfYear.fromDate(new Date("2017-07-22T12:12:12"));
                expect(t.month).to.equal(7);
                expect(t.day).to.equal(22);
            });
        });
    });
});
