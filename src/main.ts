import * as mc from "mojang-minecraft";
import * as utils from './utils/utils.js';
/**
 * @author xxyz30
 * World Editor 
 */

const WORLD = mc.world
const DIMENSION = mc.Dimension
const EVENTS = WORLD.events

EVENTS.beforeItemUseOn.subscribe(e => {
    utils.tellrawText("hello world!")
})