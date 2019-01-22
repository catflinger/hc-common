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
            expect(sc.logPosition).to.equal(1);
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
            expect(sc.logPosition).to.be.NaN;
        });
        it("load with logPosition missing", () => {
            let sc: SensorConfig = new SensorConfig({
                id: "A",
                description: "B",
                role: "C",
            }); 
            expect(sc.id).to.equal("A");
            expect(sc.description).to.equal("B");
            expect(sc.role).to.equal("C");
            expect(sc.logPosition).to.be.NaN;
        });
    });
    
    it("should fail to load with invalid data", () => {
        expect(() => { new SensorConfig({})}).to.throw;
        expect(() => { new SensorConfig(undefined)}).to.throw;
    });
});
