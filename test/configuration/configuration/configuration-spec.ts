import "mocha";
import * as chai from "chai";

import { Configuration } from "../../../src/configuration/configuration";
import { IConfigurationM } from "../../../src/interfaces";

const expect = chai.expect;

describe("Configuration", () => {

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

    it("should produce a mutable copy", () => {
        let c: Configuration = new Configuration(goodData);
        let m: IConfigurationM = c.toMutable();

        expect(m.namedConfig.saturdayProgramId == "A");
        expect(m.namedConfig.sundayProgramId == "B");
        expect(m.namedConfig.weekdayProgramId == "C");

        expect(m.datedConfig.length).to.equal(2);

        expect(m.datedConfig[0].programId).to.equal("X");
        expect(m.datedConfig[0].timeOfYear.month).to.equal(8);
        expect(m.datedConfig[0].timeOfYear.day).to.equal(4);

        expect(m.datedConfig[1].programId).to.equal("Y");
        expect(m.datedConfig[1].timeOfYear.month).to.equal(1);
        expect(m.datedConfig[1].timeOfYear.day).to.equal(31);

        expect(m.programConfig.length).to.equal(2);

        expect(m.programConfig[0].id).to.equal("X");
        expect(m.programConfig[0].name).to.equal("P1");
        expect(m.programConfig[0].minHwTemp).to.equal(12);
        expect(m.programConfig[0].maxHwTemp).to.equal(30);

        expect(m.programConfig[1].id).to.equal("Y");
        expect(m.programConfig[1].name).to.equal("P2");
        expect(m.programConfig[1].minHwTemp).to.equal(12);
        expect(m.programConfig[1].maxHwTemp).to.equal(30);

        expect(m.sensorConfig.length).to.equal(2);

        expect(m.sensorConfig[0].id).to.equal("A");
        expect(m.sensorConfig[0].description).to.equal("B");

        expect(m.sensorConfig[1].id).to.equal("C");
        expect(m.sensorConfig[1].description).to.equal("D");

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
