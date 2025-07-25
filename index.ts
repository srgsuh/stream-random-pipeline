import displayRandomNumbers, {validate, writeRandomNumbers} from "./src/displayRandomNumbers.ts";
import {getParameters} from "./src/config_params.ts";
import {OutputFormatter} from "./src/OutputFormatter.js";

const {count, min, max} = getParameters();
console.log(count, min, max);

displayRandomNumbers({min, max, count, isUnique: true})
    .catch(err => console.error(err));

console.log("DONE");