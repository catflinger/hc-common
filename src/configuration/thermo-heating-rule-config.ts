import { ConfigValidation } from "../config-validation";
import { IThermoHeatingRuleConfig } from "../interfaces";

export class ThermoHeatingRuleConfig implements IThermoHeatingRuleConfig {
    public readonly sensorId: string;
    public readonly max: number;
    public readonly min: number;

    constructor(data: any) {
        this.sensorId = ConfigValidation.getString(data.sensorId, "ThermoHeatingRuleConfig:sensorId");
        this.max = ConfigValidation.getNumber(data.max, "ThermoHeatingRuleConfig:max");
        this.min = ConfigValidation.getNumber(data.min, "ThermoHeatingRuleConfig:min");
    }
}
