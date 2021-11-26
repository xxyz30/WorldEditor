import * as mc from "mojang-minecraft";
import * as utils from "./utils.js";
/**
 * @author xxyz30
 * utils
 */
let dim = utils.Factory.getDimension(0)

function tellrawText(t: string, target: ("@s" | "@a" | "@e" | "@p" | "@r" | string) = "@a") {
    dim.runCommand(`tellraw ${target} {"rawtext":[{"text":"${t}"}]}`)
}
function tellrawTranslation(t: string, withList: string[] = null, target: ("@s" | "@a" | "@e" | "@p" | "@r" | string) = "@a") {
    if (withList === null) {
        // tellrawText(t)
        // tellrawText('-----')
        dim.runCommand(`tellraw ${target} {"rawtext":[{"translate":"${t}"}]}`)
    } else {
        dim.runCommand(`tellraw ${target} {"rawtext":[{"translate":"${t}","with":${JSON.stringify(withList)}}]}`)
    }
}


export { tellrawText, tellrawTranslation }