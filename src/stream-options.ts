import {ReadableOptions, TransformOptions, WritableOptions} from "node:stream";

const HIGH_WATER_MARK = 1;
const OBJECT_MODE = true;

export const READABLE_OPTIONS: ReadableOptions = {
    highWaterMark: HIGH_WATER_MARK,
    objectMode: OBJECT_MODE,
};

export const TRANSFORM_OPTIONS: TransformOptions = {
    readableHighWaterMark: HIGH_WATER_MARK,
    writableHighWaterMark: HIGH_WATER_MARK,
    readableObjectMode: OBJECT_MODE,
    writableObjectMode: OBJECT_MODE,
}

export const WRITABLE_OPTIONS: WritableOptions = {
    highWaterMark: HIGH_WATER_MARK,
    objectMode: OBJECT_MODE,
}