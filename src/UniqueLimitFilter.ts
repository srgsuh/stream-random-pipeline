import {Transform, TransformCallback, TransformOptions} from "node:stream";
import logger from "./logger.ts";

export class UniqueLimitFilter extends Transform{
    private passedValues = new Set<number>();
    constructor(private limit: number, options?: TransformOptions) {
        super(options);
        logger.debug("UniqueFilter: Created");
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        const data = chunk.toString();
        if (this.passedValues.size < this.limit) {
            if (!this.passedValues.has(data)) {
                this.passedValues.add(data);
                this.push(data);
                logger.debug(`UniqueFilter: Pushing chunk = ${data}`);
            }
        }
        if (this.passedValues.size < this.limit) {
            callback();
        } else {
            this.push(null);
            logger.debug("UniqueLimitFilter: End of stream");
        }
    }
}