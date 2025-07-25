import config from "config";
import logger from "./logger.ts";
export interface ApplicationParameters {
    count: number;
    min: number;
    max: number;
    isUnique: boolean;
}

const DEFAULT_COUNT = 7;
const DEFAULT_MIN = 1;
const DEFAULT_MAX = 49;
const DEFAULT_IS_UNIQUE = false;

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
    const isUnique = getConfigValue<boolean>("random_sequence.is_unique", DEFAULT_IS_UNIQUE);
    logger.debug(`Parameters: count: ${count}, min: ${min}, max: ${max}, isUnique: ${isUnique}`);

    return {count, min, max, isUnique};
}