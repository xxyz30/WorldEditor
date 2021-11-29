import { RegisterCommand } from './utils/register-command.js';
import * as mc from "mojang-minecraft";
import * as utils from './utils/utils.js';
import { WorldEditorCore } from "./core/core.js";
import { registerCommand } from "./command/register.js";
import { tipText } from "./texts/texts.js";
/**
 * @author xxyz30
 * World Editor
 */
const CORE = new Map();
const WORLD = mc.world;
const DIMENSION = mc.Dimension;
const EVENTS = WORLD.events;
const SELECTED_NODE = new Map();
let open = true;
registerCommand(CORE);
EVENTS.beforeItemUseOn.subscribe(e => {
    if (open && e.item.id === 'minecraft:wooden_axe' && e.source.id === 'minecraft:player') {
        e.cancel = true;
        let nodes = SELECTED_NODE.get(e.source.nameTag);
        nodes.push(e.blockLocation);
        if (nodes.length == 1) {
            utils.tellrawTranslation(tipText.select_1);
        }
        else {
            utils.tellrawTranslation(tipText.select_2, [`${[nodes[0].x, nodes[0].y, nodes[0].z]}`, `${[nodes[1].x, nodes[1].y, nodes[1].z]}`]);
            CORE.get(e.source.nameTag).setArea(nodes[0], nodes[1], e.source.dimension);
            nodes.length = 0;
        }
    }
});
EVENTS.playerJoin.subscribe(e => {
    if (!CORE.has(e.player.nameTag)) {
        CORE.set(e.player.nameTag, new WorldEditorCore());
        SELECTED_NODE.set(e.player.nameTag, []);
    }
});
/**
 * precinct open?
 * 选区打开或者关闭
 */
RegisterCommand.register('precinct', data => {
    if (data.args.length == 0) {
        utils.tellrawTranslation(tipText.mod_switch_state, [open ? tipText.mod_switch_state_open : tipText.mod_switch_state_close]);
    }
    else {
        if (data.args[0] == 'true') {
            utils.tellrawTranslation(tipText.mod_switch_state_open);
            open = true;
        }
        else if (data.args[1] == 'false') {
            utils.tellrawTranslation(tipText.mod_switch_state_close);
            open = false;
        }
        else {
            utils.tellrawTranslation(tipText.command_format_fail);
        }
    }
});
