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
                role: "C",
                logPosition: 1,
            }); 
            expect(sc.id).to.equal("A");
            expect(sc.description).to.equal("B");
            expect(sc.role).to.equal("C");
        });
        it("load with role missing", () => {
            let sc: SensorConfig = new SensorConfig({
                id: "A",
                description: "B",
                logPosition: NaN,
            }); 
            expect(sc.id).to.equal("A");
            expect(sc.description).to.equal("B");
            expect(sc.role).to.equal("");
        });
    });
    
    it("should fail to load with invalid data", () => {
        expect(() => { new SensorConfig({})}).to.throw;
        expect(() => { new SensorConfig(undefined)}).to.throw;
    });
});
