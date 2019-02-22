import "mocha";
import * as chai from "chai";

import { RuleConfig } from "../../../src/configuration/rule-config";
import { TimeOfDay } from "../../../src/configuration/time-of-day";

const expect = chai.expect;

describe("RuleConfig", () => {

    it("should load with valid data", () => {
        let r: RuleConfig = new RuleConfig(goodData); 
        expect(r.startTime.hour).to.equal(12);
        expect(r.endTime.hour).to.equal(13);
    });

    it("should fail to load with bad data", () => {
        let badData = Object.assign({}, goodData);
        badData.endTime = undefined;
        expect(() => { new RuleConfig(badData) }).to.throw; 

        badData = Object.assign({}, goodData);
        badData.startTime = undefined;
        expect(() => { new RuleConfig(badData) }).to.throw;
        
        
    });
});

let goodData = {
    kind: "BasicHeatingRule",
    startTime: {
        hour: 12,
        minute: 12,
        second: 12
    },
    endTime: {
        hour: 13,
        minute: 12,
        second: 12
    }
};