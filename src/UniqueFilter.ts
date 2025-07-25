import {Transform, TransformCallback} from "node:stream";
import logger from "./logger.js";

export class UniqueFilter extends Transform{
    private passedValues = new Set<number>();
    constructor() {
        super();
        logger.debug("UniqueFilter: Created");
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        if (!this.passedValues.has(chunk)) {
            this.passedValues.add(chunk);
            this.push(chunk);
        }
        callback();
    }
}