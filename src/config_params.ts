import config from "config";
import logger from "./logger.ts";
export interface ApplicationParameters {
    count: number;
    min: number;
    max: number;
}

export class ConfigError extends Error {}

const DEFAULT_COUNT = 7;
const DEFAULT_MIN = 1;
const DEFAULT_MAX = 49;

export function getConfigValue<T>(key: string, defaultValue: T): T {
    if (config.has(key)) {
        return config.get<T>(key);
    }
    return defaultValue;
}

export function getParameters():ApplicationParameters {
    const count = getConfigValue<number>("random_sequence.count", DEFAULT_COUNT);
    const min = getConfigValue<number>("random_sequence.min", DEFAULT_MIN);
    const max = getConfigValue<number>("random_sequence.max", DEFAULT_MAX);
    logger.debug(`Parameters: count: ${count}, min: ${min}, max: ${max}`);

    return {count, min, max};
}