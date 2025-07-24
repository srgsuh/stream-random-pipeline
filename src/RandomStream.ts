import {Readable} from "node:stream";
import _ from "lodash";

export class RandomStream extends Readable {
    constructor(private min: number, private max: number, highWaterMark?: number) {
        const options = highWaterMark? {highWaterMark} : undefined;
        super(options);
    }
    _read() {
        this.push(_.random(this.min, this.max));
    }
}