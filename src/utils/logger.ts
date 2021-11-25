import * as mc from "mojang-minecraft";
import * as utils from "./utils.js";
/**
 * @author xxyz30
 * utils
 */
let dim = utils.factory.getDimension(0)

function tellrawText(t: string, target: ("s" | "a" | "e" | "p" | "r") = "a") {
    dim.runCommand(`tellraw @${target} {"rawtext":[{"text":"${t}"}]}`)
}
function tellrawTranslation(t: String, target: ("s" | "a" | "e" | "p" | "r") = "a") {
    dim.runCommand(`tellraw @${target} {"rawtext":[{"translation":"${t}"}]}`)
}


export {tellrawText, tellrawTranslation}