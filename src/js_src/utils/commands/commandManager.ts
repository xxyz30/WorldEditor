import { Block, BlockLocation, BlockPermutation, Dimension } from 'mojang-minecraft';
import * as utils from '../utils.js'

export function setBlockByInstance(dimension: Dimension, permutation: BlockPermutation, targetLocation: BlockLocation) {
    let replacedBlock = dimension.getBlock(targetLocation)
    replacedBlock.setPermutation(permutation)
}
export function setBlockById(dimension: Dimension, blockName: string, location: BlockLocation, data: number | string = 0) {
    dimension.runCommand(`setblock ${location.x} ${location.y} ${location.z} ${blockName} ${data}`)
}
export function fillBlockById(
    dimension: Dimension,
    location: BlockLocation,
    fillBlockName: string,
    fillData: number | string = 0,
    filledBlockName: string = 'minecraft:air',
    filledData: number | string = 0
) {
    //获取目前位置的方块
    let currentBlock = dimension.getBlock(location)
    //若是要被填充的方块，则填充
    if(currentBlock.id === filledBlockName){
        dimension.runCommand(`setblock ${location.x} ${location.y} ${location.z} ${fillBlockName} ${fillData}`)
    }
}