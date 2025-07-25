import {Transform, TransformCallback} from "node:stream";
import logger from "./logger.js";

export class LimitFilter extends Transform{
    private counter = 0;
    constructor(private limit: number, highWaterMark?: number) {
        const options = highWaterMark? {highWaterMark} : undefined;
        super(options);
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        if (this.counter < this.limit) {
            logger.debug(`LimitFilter: Pushing chunk = ${chunk}, counter = ${this.counter + 1}`);
            this.push(chunk);
        }
        this.counter++;
        if (this.counter < this.limit) {
            callback();
        }
        else {
            logger.debug("LimitFilter: End of stream");
            this.push(null);
        }
    }

    _flush(callback: TransformCallback) {
        logger.debug("LimitFilter: Flushing");
        callback();
    }
}