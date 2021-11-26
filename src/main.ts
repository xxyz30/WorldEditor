import { RegisterCommand } from './utils/register-command.js';
import * as mc from "mojang-minecraft";
import * as utils from './utils/utils.js';
import { WorldEditorCore } from "./core/core.js";
import { registerCommand } from "./command/register.js";
import { tipText } from "./texts/texts.js"
/**
 * @author xxyz30
 * World Editor 
 */
const CORE = new WorldEditorCore()
const WORLD = mc.world
const DIMENSION = mc.Dimension
const EVENTS = WORLD.events

const SELECTED_NODE: mc.BlockLocation[] = []

let open = true;

registerCommand(CORE)

EVENTS.beforeItemUseOn.subscribe(e => {
    if (open && e.item.id === 'minecraft:wooden_axe') {
        e.cancel = true
        SELECTED_NODE.push(e.blockLocation)
        if (SELECTED_NODE.length == 1) {
            utils.tellrawText("再次点击选择第二个点")
        } else {
            utils.tellrawText("选择完毕")
            utils.tellrawText(`${[SELECTED_NODE[0].x, SELECTED_NODE[0].y, SELECTED_NODE[0].z]}`)
            utils.tellrawText(`${[SELECTED_NODE[1].x, SELECTED_NODE[1].y, SELECTED_NODE[1].z]}`)
            CORE.setArea(SELECTED_NODE[0], SELECTED_NODE[1], e.source.dimension)
            SELECTED_NODE.length = 0
        }
    }
})
/**
 * precinct open?
 * 选区打开或者关闭
 */
RegisterCommand.register('precinct', data => {
    if (data.args.length == 0) {
        utils.tellrawTranslation(tipText.mod_switch_state, [open ? tipText.mod_switch_state_open : tipText.mod_switch_state_close])
    } else {
        if (data.args[0] == 'true') {
            utils.tellrawTranslation(tipText.mod_switch_state_open)
            open = true
        } else if (data.args[1] == 'false') {
            utils.tellrawTranslation(tipText.mod_switch_state_close)
            open = false
        } else {
            utils.tellrawTranslation(tipText.command_format_fail)
        }
    }
})