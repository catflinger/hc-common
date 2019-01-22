import { ConfigValidation } from "../config-validation";
import { ISensorConfig } from "../interfaces";

export class SensorConfig implements ISensorConfig {
    public tag: any = undefined;
    public readonly id: string;
    public readonly description: string;
    public readonly role: string;
    public readonly deleted: boolean;

    constructor(data: any) {
        this.id = ConfigValidation.getString(data.id, "sensorConfig:id");
        this.description = ConfigValidation.getString(data.description, "sensorConfig:description");
        this.role = ConfigValidation.getString(data.role, "sensorConfig:role", "");
        this.deleted = ConfigValidation.getBoolean(data.deleted, "sensorConfig:deleted", false);
    }

    public toJSON(): any {
        return {
            deleted: this.deleted,
            description: this.description,
            id: this.id,
            role: this.role,
        };
    }
}
