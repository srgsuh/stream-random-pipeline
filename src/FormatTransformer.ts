import {Transform, TransformCallback} from "node:stream";
import {WRITABLE_OPTIONS} from "./stream-options.js";

export interface FormatTransformerOptions {
    delimiter: string;
    beforeAll: string;
    afterAll: string;
}

const defaultOptions: FormatTransformerOptions = {
    delimiter: ', ',
    beforeAll: '[ ',
    afterAll: ' ]'
}

export class FormatTransformer extends Transform {
    private notFirst = false;
    constructor() {
        super(WRITABLE_OPTIONS);
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        const prefix: string = this.prefix();
        this.push(`${prefix}${chunk}`);
        this.notFirst = true;
        callback();
    }

    private prefix(): string {
        return this.notFirst? defaultOptions.delimiter: defaultOptions.beforeAll;
    }

    _final(callback: (error?: (Error | null)) => void) {
        this.push(defaultOptions.afterAll + "\n");
        callback();
    }
}