import * as mc from "mojang-minecraft";
import * as utils from './utils/utils.js';
import './command/register.js';
import { WorldEditorCore } from "./core/core.js";
import { registerCommand } from "./command/register.js";
/**
 * @author xxyz30
 * World Editor
 */
const CORE = new WorldEditorCore();
const WORLD = mc.world;
const DIMENSION = mc.Dimension;
const EVENTS = WORLD.events;
const SELECTED_NODE = [];
registerCommand(CORE);
EVENTS.beforeItemUseOn.subscribe(e => {
    if (e.item.id === 'minecraft:wooden_axe') {
        e.cancel = true;
        SELECTED_NODE.push(e.blockLocation);
        if (SELECTED_NODE.length == 1) {
            utils.tellrawText("再次点击选择第二个点");
        }
        else {
            utils.tellrawText("选择完毕");
            utils.tellrawText(`${[SELECTED_NODE[0].x, SELECTED_NODE[0].y, SELECTED_NODE[0].z]}`);
            utils.tellrawText(`${[SELECTED_NODE[1].x, SELECTED_NODE[1].y, SELECTED_NODE[1].z]}`);
            CORE.setArea(SELECTED_NODE[0], SELECTED_NODE[1]);
            SELECTED_NODE.length = 0;
        }
    }
});
