import { ConfigValidation } from "../config-validation";
import { ISensorConfig } from "../interfaces";

export class SensorConfig implements ISensorConfig {
    public readonly id: string;
    public readonly description: string;
    public readonly role: string;
    public readonly logPosition: number;

    constructor(data: any) {
        this.id = ConfigValidation.getString(data.id, "sensorConfig:id");
        this.description = ConfigValidation.getString(data.description, "sensorConfig:description");
        this.role = ConfigValidation.getString(data.role, "sensorConfig:role", "");
        this.logPosition = ConfigValidation.getNumber(data.logPosition, "sensorConfig:logPosition", NaN);
    }

    public toJSON(): any {
        return {
            description: this.description,
            id: this.id,
            logPosition: this.logPosition,
            role: this.role,
        };
    }
}
