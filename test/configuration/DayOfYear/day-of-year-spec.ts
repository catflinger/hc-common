import "mocha";
import * as chai from "chai";

const expect = chai.expect;

import { DayOfYear } from "../../../src/configuration/day-of-year";

describe("Day Of Year", () => {

    describe("constructor", () => {
        it(" should construct with good data", () => {
            let t = new DayOfYear({year: 2019, month: 12, day: 1 });
            expect(t.month).to.equal(12);
            expect(t.day).to.equal(1);

            t = new DayOfYear({ year: 2019, month: 2, day: 28 });
            expect(t.month).to.equal(2);
            expect(t.day).to.equal(28);

            t = new DayOfYear({ year: 2019, month: 2, day: 29 });
            expect(t.month).to.equal(2);
            expect(t.day).to.equal(29);

            t = new DayOfYear({ year: 2019, month: 1, day: 31 });
            expect(t.month).to.equal(1);
            expect(t.day).to.equal(31);
        });

        it(" should not construct with bad data", () => {
            expect(() => new DayOfYear({ year: 2019, month: 1, day: null })).to.throw;
            expect(() => new DayOfYear({ year: 2019, month: null, day: 1 })).to.throw;

            expect(() => new DayOfYear({ year: 2019, month: 0.2, day: 1 })).to.throw;
            expect(() => new DayOfYear({ year: 2019, month: 1, day: 0.1 })).to.throw;

            expect(() => new DayOfYear({ year: 2019, month: 0, day: 1 })).to.throw;
            expect(() => new DayOfYear({ year: 2019, month: 13, day: 1 })).to.throw;

            expect(() => new DayOfYear({ year: 2019, month: -1, day: 1 })).to.throw;
            expect(() => new DayOfYear({ year: 2019, month: 1, day: -1 })).to.throw;
        });

        describe("fromDate", () => {
            it(" should construct with good data", () => {
                let t = DayOfYear.fromDate(new Date("2017-07-22T12:12:12"));
                expect(t.month).to.equal(7);
                expect(t.day).to.equal(22);
            });
        });

        describe("isToday", () => {
            it(" should recogise today", () => {
                let t = DayOfYear.fromDate(new Date("2017-07-22T12:12:12"));
                expect(t.isToday(new Date("2017-07-22T13:14:15"))).to.be.true;
            });
            it(" should not recogise tomorrow", () => {
                let t = DayOfYear.fromDate(new Date("2017-07-22T12:12:12"));
                expect(t.isToday(new Date("2017-07-23T13:14:15"))).to.be.false;
            });
        });

        describe("isSameAs", () => {
            it(" should recogise same day", () => {
                let t1 = DayOfYear.fromDate(new Date("2018-07-22T12:12:12"));
                let t2 = DayOfYear.fromDate(new Date("2018-07-22T13:14:15"));
                expect(t1.isSameAs(t2)).to.be.true;
            });
            it(" should not recogise tomorrow", () => {
                let t1 = DayOfYear.fromDate(new Date("2018-07-22T12:12:12"));
                let t2 = DayOfYear.fromDate(new Date("2018-07-21T13:14:15"));
                expect(t1.isSameAs(t2)).to.be.false;
            });
        });

    });
});
