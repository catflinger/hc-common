import "mocha";
import * as chai from "chai";

import { SensorConfig } from "../../../src/configuration/sensor-config";

const expect = chai.expect;

describe("Sensor Config", () => {
    describe("loading with good data", () => {
        it("load with all fields present", () => {
            let sc: SensorConfig = new SensorConfig({
                id: "A",
                description: "B",
                role: "hw",
                displayColor: "green",
                displayOrder: 21,
            }); 
            expect(sc.id).to.equal("A");
            expect(sc.description).to.equal("B");
            expect(sc.role).to.equal("hw");
            expect(sc.displayColor).to.equal("green");
            expect(sc.displayOrder).to.equal(21);
        });
        it("should not load with role missing", () => {
            expect(() => new SensorConfig({
                id: "A",
                description: "B",
            })).to.throw; 
        });
    });
    
    it("should fail to load with no data", () => {
        expect(() => { new SensorConfig({})}).to.throw;
        expect(() => { new SensorConfig(undefined)}).to.throw;
    });
});
