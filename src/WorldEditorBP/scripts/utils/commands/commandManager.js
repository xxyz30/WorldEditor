export function setBlockByInstance(dimension, permutation, targetLocation) {
    let replacedBlock = dimension.getBlock(targetLocation);
    replacedBlock.setPermutation(permutation);
}
export function setBlockById(dimension, blockName, location, data = 0) {
    dimension.runCommand(`setblock ${location.x} ${location.y} ${location.z} ${blockName} ${data}`);
}
export function fillBlockById(dimension, location, fillBlockName, fillData = 0, filledBlockName = 'minecraft:air', filledData = 0) {
    //获取目前位置的方块
    let currentBlock = dimension.getBlock(location);
    //若是要被填充的方块，则填充
    if (currentBlock.id === filledBlockName) {
        dimension.runCommand(`setblock ${location.x} ${location.y} ${location.z} ${fillBlockName} ${fillData}`);
    }
}
