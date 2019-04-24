import { RoleType } from "./interfaces";
export declare class ConfigValidation {
    static getBoolean(val: any, message: string, defaultValue?: boolean): boolean;
    static getString(val: any, message: string, defaultValue?: string): string;
    static getRoleType(val: any, message: string, defaultValue?: string): RoleType;
    static getNumber(val: any, message: string, defaultValue?: number): number;
    static getDate(val: any, message: string, defaultValue?: Date): Date;
}
