import { Block, BlockLocation, Dimension } from 'mojang-minecraft';
import * as utils from '../utils.js'

export function setBlockByInstance(block: Block, data: number = 0) {
    block.dimension.runCommand(`setblock ${block.x} ${block.y} ${block.z} ${block.id} ${data}`)
}
export function setBlockById(dimension:Dimension, blockName:string, location:BlockLocation, data: number|string = 0) {
    dimension.runCommand(`setblock ${location.x} ${location.y} ${location.z} ${blockName} ${data}`)
}