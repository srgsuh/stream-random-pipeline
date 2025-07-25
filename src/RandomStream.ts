import {Readable, ReadableOptions} from "node:stream";
import _ from "lodash";
import logger from "./logger.ts";

export class RandomStream extends Readable {
    private counter = 0;
    private _stop = false;
    constructor(private min: number, private max: number, options?: ReadableOptions) {
        super(options);
    }
    _read() {
        if (this._stop) {
            logger.debug("RandomStream: Stop signal received. End of stream");
            this.push(null);
            return;
        }
        const chunk = _.random(this.min, this.max);
        this.push(chunk.toString());
        this.counter++;
        logger.debug(`RandomStream: Pushing chunk = ${chunk}, count = ${this.counter}`);
    }
    stop() {
        this._stop = true;
    }
}