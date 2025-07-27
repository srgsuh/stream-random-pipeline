import displayRandomNumbers from "./src/displayRandomNumbers.ts";
import {getParameters} from "./src/config_params.ts";

const {count, min, max, isUnique} = getParameters();

displayRandomNumbers({min, max, count: 49, isUnique})
    .catch(err => console.error(err));
