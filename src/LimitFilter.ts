import {Transform, TransformCallback, TransformOptions} from "node:stream";
import logger from "./logger.ts";

export class LimitFilter extends Transform{
    private counter = 0;
    constructor(private limit: number, options?: TransformOptions) {
        super(options);
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        if (this.counter >= this.limit) {
            logger.debug(`LimitFilter: SKIPPING chunk = ${chunk} due to limit`);
            return;
        }

        logger.debug(`LimitFilter: Pushing chunk = ${chunk}, counter = ${this.counter + 1}`);
        callback(null, chunk);

        this.counter++;

        if (this.counter === this.limit) {
            this.push(null);
            logger.debug("LimitFilter: The limit is reached. End of stream");
        }
    }
}