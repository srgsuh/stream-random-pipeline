import {Transform, TransformCallback, TransformOptions} from "node:stream";
import logger from "./logger.ts";

export class UniqueFilter extends Transform{
    private passedValues = new Set<number>();
    constructor(options?: TransformOptions) {
        super(options);
        logger.debug("UniqueFilter: Created");
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        const data = chunk.toString();
        if (!this.passedValues.has(data)) {
            this.passedValues.add(data);
            this.push(data);
            logger.debug(`UniqueFilter: Pushing chunk = ${data}`);
        }
        else {
            logger.debug(`UniqueFilter: Dropping duplicate chunk = ${data}`);
        }
        callback();
    }
}