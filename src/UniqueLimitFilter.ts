import {Transform, TransformCallback} from "node:stream";
import logger from "./logger.ts";
import {TRANSFORM_OPTIONS} from "./stream-options.js";

export class UniqueLimitFilter extends Transform{
    private passedValues = new Set<string>();
    constructor(private limit: number) {
        super(TRANSFORM_OPTIONS);
        logger.debug("UniqueFilter: Created");
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        if (this.passedValues.size >= this.limit) {
            logger.debug(`UniqueFilter: DROPPING chunk = ${chunk} due to limit exceeded`);
            return;
        }

        const stringChunk = JSON.stringify(chunk);
        if (this.passedValues.has(stringChunk)) {
            callback();
            logger.debug(`UniqueFilter: The value is already passed. SKIPPING chunk = ${stringChunk}`);
        }
        else {
            callback(null, chunk);

            this.passedValues.add(stringChunk);
            logger.debug(`UniqueFilter: Pushing chunk = ${stringChunk} (${this.passedValues.size}/${this.limit})`);
            if (this.limit === this.passedValues.size) {
                this.push(null);
                logger.debug("UniqueFilter: The limit is reached. End of stream");
            }
        }
    }
}