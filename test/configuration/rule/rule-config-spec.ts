import "mocha";
import * as chai from "chai";

import { RuleConfig } from "../../../src/configuration/rule-config";
import { TimeOfDay } from "../../../src/configuration/time-of-day";

const expect = chai.expect;

describe("RuleConfig", () => {

    it("should load with minimal data", () => {
        let r: RuleConfig = new RuleConfig(goodData); 
        expect(r.startTime.hour).to.equal(12);
        expect(r.endTime.hour).to.equal(13);
        expect(r.id.length).to.be.greaterThan(10);
        expect(r.role).to.be.null;
    });

    it("should load with full data", () => {
        let fullData = Object.assign({}, goodData);
        fullData.id = "xyz";
        fullData.role = "hw";
        fullData.temp = 18;
        let r: RuleConfig = new RuleConfig(fullData);

        expect(r.startTime.hour).to.equal(12);
        expect(r.endTime.hour).to.equal(13);
        expect(r.id).to.equal("xyz");
        expect(r.role).to.equal("hw");
        expect(r.temp).to.equal(18);

        fullData = Object.assign({}, goodData);
        fullData.role = null;
        r = new RuleConfig(fullData);
        expect(r.role).to.be.null;

    });

    it("should fail to load with bad data", () => {
        let badData = Object.assign({}, goodData);
        badData.endTime = undefined;
        expect(() => { new RuleConfig(badData) }).to.throw; 

        badData = Object.assign({}, goodData);
        badData.startTime = undefined;
        expect(() => { new RuleConfig(badData) }).to.throw;
        
        badData = Object.assign({}, goodData);
        badData.role = "noSuchRole";
        expect(() => { new RuleConfig(badData) }).to.throw; 

        badData = Object.assign({}, goodData);
        badData.role = "";
        expect(() => { new RuleConfig(badData) }).to.throw; 

    });
});

let goodData: any = {
    startTime: {
        hour: 12,
        minute: 12,
        second: 12
    },
    endTime: {
        hour: 13,
        minute: 12,
        second: 12,
    },
};