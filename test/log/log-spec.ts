import "mocha";
import * as chai from "chai";

import { LogExtract } from "../../src/log/log-extract";

const expect = chai.expect;

describe("LogExtract", () => {

    describe("loading with valid data", () => {

        it ("should load with minimal data", () => {
            let extract = new LogExtract(getMinimalData()); 
        });

        it ("should load with full data", () => {
            let extract = new LogExtract(fullData); 
        });

        it ("should throw with no data supplied", () => {
            expect(() => {
                new LogExtract({}); 
            }).to.throw;
        });

        it ("should throw with bad from", () => {
            let md = getMinimalData();
            md.from = "boo hoo";
            expect(() => new LogExtract(md)).to.throw; 
        });

        it ("should throw with bad from", () => {
            let md = getMinimalData();
            md.to = "bad boy!";
            expect(() => new LogExtract(md)).to.throw; 
        });

        it ("should throw with missing sensors", () => {
            let md = getMinimalData();
            md.sensors = undefined;
            expect(() => new LogExtract(md)).to.throw; 
        });

        it ("should throw with missing entries", () => {
            let md = getMinimalData();
            md.entries = undefined;
            expect(() => new LogExtract(md)).to.throw; 
        });

    });
});

function getMinimalData(): any {
    return Object.assign({}, minimalData);
}

const minimalData: any = {
    dayOfYear: { year: 2017, day: 13, month: 12},
    sensors: [],
    entries: [],
}

const fullData: any = {
    dayOfYear: { year: 2017, day: 13, month: 12},
    sensors: ["12", "13"],
    entries: [ 
        { 
            date: "2019-12-13T12:00:00",
            hotWater: true,
            heating: false,
            readings: [ 11.1, 12.2],
        },
        { 
            date: "2019-12-13T12:10:00",
            hotWater: false,
            heating: true,
            readings: [ 11.3, 12.0],
        },
    ],
}
