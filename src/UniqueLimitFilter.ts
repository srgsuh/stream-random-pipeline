import {Transform, TransformCallback, TransformOptions} from "node:stream";
import logger from "./logger.ts";

export class UniqueLimitFilter extends Transform{
    private passedValues = new Set<string>();
    constructor(private limit: number, options?: TransformOptions) {
        super(options);
        logger.debug("UniqueFilter: Created");
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        if (this.passedValues.size >= this.limit) {
            logger.debug(`UniqueFilter: DROPPING chunk = ${chunk} due to limit exceeded`);
            return;
        }

        const data = JSON.stringify(chunk);
        if (this.passedValues.has(data)) {
            callback();
            logger.debug(`UniqueFilter: The value is already passed. SKIPPING chunk = ${data}`);
        }
        else {
            callback(null, chunk);
            this.passedValues.add(data);
            logger.debug(`UniqueFilter: Pushing chunk = ${data} (${this.passedValues.size}/${this.limit})`);
            if (this.limit === this.passedValues.size) {
                this.push(null);
                logger.debug("UniqueFilter: The limit is reached. End of stream");
            }
        }
    }
}