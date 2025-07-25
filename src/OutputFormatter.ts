import {Writable, WritableOptions} from "node:stream";

export class OutputFormatter extends Writable {
    private isFirst = true;

    constructor(options?: WritableOptions) {
        super(options);
    }

    _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        if (!this.isFirst) {
            process.stdout.write(', ');
        }
        this.isFirst = false;
        process.stdout.write(`${chunk}`);
        callback();
    }

    _final(callback: (error?: (Error | null)) => void) {
        process.stdout.write('\n');
        callback();
    }
}