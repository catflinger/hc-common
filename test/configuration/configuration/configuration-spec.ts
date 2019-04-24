import "mocha";
import * as chai from "chai";

import { Configuration } from "../../../src/configuration/configuration";

const expect = chai.expect;

describe("Program", () => {

    describe("should load with valid data", () => {
        it ("should load with empty arrays", () => {
            let c: Configuration = new Configuration(goodDataEmpty); 
            expect(c.getNamedConfig().saturdayProgramId).to.equal("A");
        });
        it ("should load with full arrays", () => {
            let c: Configuration = new Configuration(goodData); 
            expect(c.getNamedConfig().saturdayProgramId).to.equal("A");
        });
    });
        it("should fail to load with invalid data", () => {
        expect(() => { new Configuration({})}).to.throw;
        expect(() => { new Configuration(undefined)}).to.throw;
    });
});

const goodDataEmpty: any = {
    namedConfig: {
        saturdayProgramId: "A",
        sundayProgramId: "B",
        weekdayProgramId: "C",
    },
    datedConfig: [] as any[],
    programConfig: [] as any[],
    sensorConfig: [] as any[],
};

const goodData: any = {
    namedConfig: {
        saturdayProgramId: "A",
        sundayProgramId: "B",
        weekdayProgramId: "C",
    },
    datedConfig: [
        {
            programId: "X",
            timeOfYear: {
                month: 8,
                day: 4
            }
        },
        {
            programId: "Y",
            timeOfYear: {
                month: 1,
                day: 31
            }
        }
    ],
    programConfig: [
        {
            id: "X",
            name: "P1",
            minHwTemp: 12,
            maxHwTemp: 30
        },
        {
            id: "Y",
            name: "P2",
            minHwTemp: 12,
            maxHwTemp: 30
        }

    ],
    sensorConfig: [
        {
            id: "A",
            description: "B",
        },
        {
            id: "C",
            description: "D",
        }
    ],
};
