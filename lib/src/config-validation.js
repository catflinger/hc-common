"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigValidation {
    static getBoolean(val, message, defaultValue) {
        return getValue("boolean", val, message, defaultValue);
    }
    static getString(val, message, defaultValue) {
        return getValue("string", val, message, defaultValue);
    }
    static getRoleType(val, message, defaultValue) {
        const role = this.getString(val, message, defaultValue);
        if (role !== "" && role !== "hw" && role !== "bedroom") {
            throw new Error(`Config validation, ${message} is not a valid role type`);
        }
        return role;
    }
    static getNumber(val, message, defaultValue) {
        return getValue("number", val, message, defaultValue);
    }
    static getDate(val, message, defaultValue) {
        let result;
        const dateExpression = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}");
        if (val instanceof Date && !isNaN(val.getTime())) {
            result = val;
        }
        else if (val === undefined && defaultValue === undefined) {
            throw new Error(`Config validation, cannot find ${message} and no default value supplied`);
        }
        else if (val !== undefined && typeof val !== "string") {
            throw new Error(`Config validation, value for ${message} is not a string`);
        }
        else if (val !== undefined && !dateExpression.test(val)) {
            throw new Error(`Config validation, value for ${message} is not formatted yyyy-mm-ddThh:mm:ss`);
        }
        else if (val === undefined && defaultValue !== undefined) {
            result = defaultValue;
        }
        else {
            result = new Date(val);
            if (isNaN(result.valueOf())) {
                throw new Error(`Config validation, value for ${message} is an invalid date string`);
            }
        }
        return result;
    }
}
exports.ConfigValidation = ConfigValidation;
function getValue(typeName, val, message, defaultValue) {
    let result;
    if (val === undefined && defaultValue === undefined) {
        throw new Error(`Config validation, cannot find ${message} and no default value supplied`);
    }
    else if (val !== undefined && typeof val !== typeName) {
        throw new Error(`Config validation, value for ${message} is not ${typeName}`);
    }
    else if (val === undefined && defaultValue !== undefined) {
        result = defaultValue;
    }
    else {
        result = val;
    }
    return result;
}
