import * as utils from "./utils.js";
/**
 * @author xxyz30
 * utils
 */
let dim = utils.Factory.getDimension(0);
function tellrawText(t, target = "@a") {
    dim.runCommand(`tellraw ${target} {"rawtext":[{"text":"${t.replace('"', "'")}"}]}`);
}
function tellrawTranslation(t, withList = null, target = "@a") {
    if (withList === null) {
        // tellrawText(t)
        // tellrawText('-----')
        dim.runCommand(`tellraw ${target} {"rawtext":[{"translate":"${t}"}]}`);
    }
    else {
        dim.runCommand(`tellraw ${target} {"rawtext":[{"translate":"${t}","with":${JSON.stringify(withList)}}]}`);
    }
}
export { tellrawText, tellrawTranslation };
