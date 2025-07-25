import {pipeline} from "node:stream/promises";
import logger from "./logger.ts";
import {RandomStream} from "./RandomStream.ts";
import {Writable} from "node:stream";
import {LimitFilter} from "./LimitFilter.ts";
import {UniqueFilter} from "./UniqueFilter.ts";
import {READABLE_OPTIONS, TRANSFORM_OPTIONS, WRITABLE_OPTIONS} from "./stream-options.js";
import {FormatTransformer} from "./FormatTransformer.ts";

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
        const randomStream = new RandomStream(parameters.min, parameters.max, READABLE_OPTIONS);
        const limit = new LimitFilter(parameters.count, TRANSFORM_OPTIONS);
        const formatter = new FormatTransformer(TRANSFORM_OPTIONS);
        const writing: Promise<void> = parameters.isUnique?
            pipeline(
                randomStream,
                new UniqueFilter(TRANSFORM_OPTIONS),
                limit,
                formatter,
                destination):
            pipeline(randomStream, limit, formatter, destination);
        await writing;
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