import { ConfigValidation } from "../config-validation";
import { IThermoHeatingRuleConfig, RoleType } from "../interfaces";

export class ThermoHeatingRuleConfig implements IThermoHeatingRuleConfig {
    public readonly role: RoleType;
    public readonly max: number;
    public readonly min: number;

    constructor(data: any) {
        this.role = ConfigValidation.getRoleType(data.role, "ThermoHeatingRuleConfig:role");
        this.max = ConfigValidation.getNumber(data.max, "ThermoHeatingRuleConfig:max");
        this.min = ConfigValidation.getNumber(data.min, "ThermoHeatingRuleConfig:min");
    }
}
