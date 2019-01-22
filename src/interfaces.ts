/**
 * All these interfaces are intended for use with immutable classes.
 *
 * The exception to this immutability is tag.  Where tag is present it is intended as a transient user defined value
 * that can be set or retrieved by the user.  The value of tag is to be ignored by classes implementing these interfaces
 * and the tag value is not serialzed.
 *
 * An example use of the tag might be to allow front-ends using a data-bound framework (such as Angular) to attach some
 * user-interface state to the object model: that a program is selected for edit for example. The tag has no meaning outside
 * of the front-end so the tag value is not sent to the server when the model is serialized.
 */

export interface IProgram {
    tag: any;
    id: string;
    name: string;
    minHwTemp: number;
    maxHwTemp: number;
    getRules(): ReadonlyArray<IRule>;
}

export interface IRule {
    tag: any;
    id: string;
    startTime: ITimeOfDay;
    endTime: ITimeOfDay;
    applyRule(currentState: IControlState, readings: ReadonlyArray<IReading>, time: ITimeOfDay | Date): IRuleResult;
}

export interface IRuleResult {
    heating: boolean | null;
    hotWater: boolean | null;
}

export interface ITimeOfDay {
    hour: number;
    minute: number;
    second: number;

    isLaterThan(other: ITimeOfDay): boolean;
    isSameAs(other: ITimeOfDay): boolean;
    isEarlierThan(other: ITimeOfDay): boolean;

    addHours(hours: number): ITimeOfDay;
    addMinutes(minutes: number): ITimeOfDay;
    addSeconds(seconds: number): ITimeOfDay;

    toSeconds(): number;
    toString(): string;
}

export interface IControlState {
    heating: boolean;
    hotWater: boolean;
}

export interface IReading {
    tag: any;
    id: string;
    description: string;
    role: string;
    value: number;
}

export interface IConfiguration {
    tag: any;
    getProgramConfig(): ReadonlyArray<IProgram>;
    getNamedConfig(): INamedConfig;
    getDatedConfig(): ReadonlyArray<IDatedConfig>;
    getSensorConfig(): ReadonlyArray<ISensorConfig>;
    toMutable(): any;
}

export interface INamedConfig {
    tag: any;
    weekdayProgramId: string;
    saturdayProgramId: string;
    sundayProgramId: string;
}

export interface IDatedConfig {
    tag: any;
    programId: string;
    date: Date;
}

export interface ISensorConfig {
    tag: any;
    id: string;
    description: string;
    role: string;
    deleted: boolean;
}

export interface IOverride {
    tag: any;
    readonly id: string;
    readonly date: Date;
    readonly rule: IRule;
}

export interface IConfigValidation {
    getBoolean(val: any, message: string, defaultValue?: boolean): boolean;
    getString(val: any, message: string, defaultValue?: string): string;
    getNumber(val: any, message: string, defaultValue?: number): number;
    getDate(val: any, message: string, defaultValue?: Date): Date;
}
