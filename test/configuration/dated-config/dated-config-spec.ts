import "mocha";
import * as chai from "chai";

import { DatedConfig } from "../../../src/configuration/dated-config";

const expect = chai.expect;

describe("Dated Config", () => {

    it("should load with valid data", () => {
        let dc: DatedConfig = new DatedConfig({
            programId: "A",
            timeOfYear: { month: 2, day: 8 },
        }); 
        expect(dc.programId).to.equal("A");
        expect(dc.timeOfYear.month).to.equal(2);
        expect(dc.timeOfYear.day).to.equal(8);
    });
    it("should fail to load with invalid data", () => {
        expect(() => { new DatedConfig({})}).to.throw;
        expect(() => { new DatedConfig(undefined)}).to.throw;
    });
});
