import * as utils from "./utils.js";
/**
 * @author xxyz30
 * utils
 */
let dim = utils.factory.getDimension(0);
function tellrawText(t, target = "a") {
    dim.runCommand(`tellraw @${target} {"rawtext":[{"text":"${t}"}]}`);
}
function tellrawTranslation(t, target = "a") {
    dim.runCommand(`tellraw @${target} {"rawtext":[{"translation":"${t}"}]}`);
}
export { tellrawText, tellrawTranslation };
