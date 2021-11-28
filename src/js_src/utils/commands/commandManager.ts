import { Block, BlockLocation, BlockPermutation, Dimension } from 'mojang-minecraft';
import * as utils from '../utils.js'

export function setBlockByInstance(dimension: Dimension, permutation: BlockPermutation, targetLocation: BlockLocation) {
    let replacedBlock = dimension.getBlock(targetLocation)
    replacedBlock.setPermutation(permutation)
}
export function setBlockById(dimension: Dimension, blockName: string, location: BlockLocation, data: number | string = 0) {
    dimension.runCommand(`setblock ${location.x} ${location.y} ${location.z} ${blockName} ${data}`)
}