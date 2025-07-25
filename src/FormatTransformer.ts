import {TransformOptions, Transform} from "node:stream";
import test from "node:test";
import Error = module

export interface OutputTransformerOptions {
    delimiter: string;
    beforeAll: string;
    afterAll: string;
}

const defaultOptions: OutputTransformerOptions = {
    delimiter: ', ',
    beforeAll: '[ ',
    afterAll: ' ]'
}

export class OutputTransformer extends Transform {
    private notFirst = false;
    constructor(options?: TransformOptions) {
        super(options);
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        const prefix: string = this.prefix();
        this.push(`${prefix}${chunk}`);
        this.notFirst = true;
        callback();
    }

    private prefix(): string {
        if (!this.notFirst) {
            return defaultOptions.beforeAll
        }
        else {
            return defaultOptions.delimiter;
        }
    }

    _final(callback: (error?: (Error | null)) => void) {
        this.push(defaultOptions.afterAll + "\n");
        callback(error);
    }
}