import {Transform, TransformCallback} from "node:stream";

class UniqueFilter extends Transform{
    private passedValues = new Set<number>();
    constructor() {
        super();
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        if (!this.passedValues.has(chunk)) {
            this.passedValues.add(chunk);
            this.push(chunk);
        }
        callback();
    }
}