import {Readable, ReadableOptions} from "node:stream";
import _ from "lodash";
import logger from "./logger.js";

export class RandomStream extends Readable {
    private counter = 0;
    constructor(private min: number, private max: number, options?: ReadableOptions) {
        super(options);
    }
    _read() {
        const chunk = _.random(this.min, this.max);
        this.push(chunk.toString());
        this.counter++;
        logger.debug(`RandomStream: Pushing chunk = ${chunk}, count = ${this.counter}`);
    }
}