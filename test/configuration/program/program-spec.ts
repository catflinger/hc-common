import "mocha";
import * as chai from "chai";

import { Program } from "../../../src/configuration/program";
import { IProgramM } from "../../../src/interfaces";

const expect = chai.expect;

describe("Program", () => {

    describe("should load with valid data", () => {
        it ("should load with id specified", () => {
            let p: Program = new Program(goodDataWithId); 
            expect(p.id).to.equal("james");
            expect(p.name).to.equal("dean");
            expect(p.maxHwTemp).to.equal(30);
            expect(p.minHwTemp).to.equal(12);
        });
        it ("should fail to load with no id specified", () => {
            expect(() => new Program(goodDataNoId)).to.throw; 
        });
        it ("should load with rules specified", () => {
            let p: Program = new Program(goodDataWithRules); 
            expect(p.id).to.equal("james");
            expect(p.name).to.equal("dean");
            expect(p.maxHwTemp).to.equal(30);
            expect(p.minHwTemp).to.equal(12);
            expect(p.getRules().length).to.equal(2);
            expect(p.getRules()[0].startTime.hour).to.equal(10);
            expect(p.getRules()[1].startTime.hour).to.equal(12);
        });
    });

    it("should fail to load with no data", () => {
        expect(() => { new Program({})}).to.throw;
        expect(() => { new Program(undefined)}).to.throw;
    });

    it("should fail to load with bad max/min temperatures", () => {
        //maxHw too high etc...
        let data = Object.assign({}, goodDataNoId);
        data.maxHwTemp = 90;
        expect(() => { new Program(data)}).to.throw;

        data = Object.assign({}, goodDataNoId);
        data.maxHwTemp = -1;
        expect(() => { new Program(data)}).to.throw;

        data = Object.assign({}, goodDataNoId);
        data.maxHwTemp = NaN;
        expect(() => { new Program(data)}).to.throw;

        //minHw too high etc...
        data = Object.assign({}, goodDataNoId);
        data.minHwTemp = 90;
        expect(() => { new Program(data)}).to.throw;

        data = Object.assign({}, goodDataNoId);
        data.minHwTemp = -1;
        expect(() => { new Program(data)}).to.throw;

        data = Object.assign({}, goodDataNoId);
        data.minHwTemp = NaN;
        expect(() => { new Program(data)}).to.throw;

        // minHw too close to maxHw etc
        data = Object.assign({}, goodDataNoId);
        data.minHwTemp = 45;
        data.maxHwTemp = 48;
        expect(() => { new Program(data)}).to.throw;

        data = Object.assign({}, goodDataNoId);
        data.minHwTemp = 50;
        data.maxHwTemp = 45;
        expect(() => { new Program(data)}).to.throw;

        //control test
        data = Object.assign({}, goodDataNoId);
        data.minHwTemp = 45;
        data.maxHwTemp = 50;
        expect(() => { new Program(data)}).not.to.throw;
    });

});

it("should produce a mutable copy", () => {
    let p: Program = new Program(goodDataWithRules);
    let m: IProgramM = p.toMutable();

    expect(m.id).to.equal("james");
    expect(m.name).to.equal("dean");
    expect(m.maxHwTemp).to.equal(30);
    expect(m.minHwTemp).to.equal(12);
    expect(m.rules.length).to.equal(2);
    expect(m.rules[0].startTime.hour).to.equal(10);
    expect(m.rules[1].startTime.hour).to.equal(12);
});

const goodDataNoId = {
    name: "dean",
    minHwTemp: 12,
    maxHwTemp: 30
};
const goodDataWithId = {
    id: "james",
    name: "dean",
    minHwTemp: 12,
    maxHwTemp: 30
};
const goodDataWithRules = {
    id: "james",
    name: "dean",
    minHwTemp: 12,
    maxHwTemp: 30,
    rules:[
        {
            kind: "BasicHeatingRule",
            startTime: {
                hour: 10,
                minute: 10,
                second: 10
            },
            endTime: {
                hour: 11,
                minute: 11,
                second: 11
            }
        },
        {
            kind: "BasicHeatingRule",
            startTime: {
                hour: 12,
                minute: 12,
                second: 12
            },
            endTime: {
                hour: 13,
                minute: 13,
                second: 13
            }
        }
    ]
};
