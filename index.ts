import displayRandomNumbers, {validate, writeRandomNumbers} from "./src/displayRandomNumbers.ts";
import {getParameters} from "./src/config_params.ts";

const {count, min, max} = getParameters();
console.log(count, min, max);

displayRandomNumbers({min: 1, max: 10, count: 5, isUnique: false})
    .catch(err => console.error(err));

console.log("DONE");