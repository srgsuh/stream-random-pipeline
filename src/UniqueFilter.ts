import {Transform, TransformCallback} from "node:stream";
import logger from "./logger.js";

export class UniqueFilter extends Transform{
    private passedValues = new Set<number>();
    constructor(highWaterMark?: number) {
        const options = highWaterMark? {highWaterMark} : undefined;
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
        callback();
    }
}