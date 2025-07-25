import displayRandomNumbers from "./src/displayRandomNumbers.ts";
import {getParameters} from "./src/config_params.ts";
import logger from "./src/logger.js";

const {count, min, max} = getParameters();

displayRandomNumbers({min, max, count, isUnique: true})
    .catch(err => console.error(err));