import {pipeline} from "node:stream/promises";
import logger from "./logger.ts";
import {RandomStream} from "./RandomStream.ts";
import {Writable} from "node:stream";
import {LimitFilter} from "./LimitFilter.ts";
import {FormatTransformer} from "./FormatTransformer.ts";
import {UniqueLimitFilter} from "./UniqueLimitFilter.js";

interface RandomGenParams {
    count: number;
    min: number;
    max: number;
    isUnique: boolean;
}

class RandomSequenceError extends Error {}

export default async function displayRandomNumbers(
    parameters: RandomGenParams) {
    await writeRandomNumbers(parameters, process.stdout);
}

export async function writeRandomNumbers(
    parameters: RandomGenParams,
    destination: Writable
) {
    try {
        validate(parameters);
        const randomStream = new RandomStream(parameters.min, parameters.max);
        const limit = parameters.isUnique?
            new UniqueLimitFilter(parameters.count):
            new LimitFilter(parameters.count);
        const formatter = new FormatTransformer();

        await pipeline(randomStream, limit, formatter, destination);
    }
    catch (error) {
        if (error instanceof RandomSequenceError) {
            console.error(`${error.message}. Check your config file.`);
        }
        else {
            throw error;
        }
    }
}

type testFn = (p: RandomGenParams) => boolean;

const CHECKS: {test: testFn, message: string}[] = [
    {
        test: (p) => {
            return [p.min, p.max, p.count].some(
                (value) => !Number.isInteger(value)
            )
        },
        message: `Amount of numbers and range bounds must be integers`
    },
    {
        test: ({count})=> (count <= 0),
        message: "Amount of numbers to produce must be positive"
    },
    {
        test: ({min, max})=> (min > max),
        message: "Range upper cannot be less than lower bound"
    },
    {
        test: ({min, max, count, isUnique})=> {
            return isUnique && (count > max - min + 1)
        },
        message: `Not enough integers in the given range to generate unique sequence`
    }
]

export function validate(params: RandomGenParams) {
    logger.debug(`Validating params: ${JSON.stringify(params)}`);
    const message = CHECKS.find((check) => check.test(params))?.message;
    if (message) {
        throw new RandomSequenceError(message);
    }
}