import {TransformOptions, Transform, TransformCallback} from "node:stream";

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
        callback();
    }
}