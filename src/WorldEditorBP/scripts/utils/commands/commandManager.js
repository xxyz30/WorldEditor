export function setBlockByInstance(dimension, permutation, targetLocation) {
    let replacedBlock = dimension.getBlock(targetLocation);
    replacedBlock.setPermutation(permutation);
}
export function setBlockById(dimension, blockName, location, data = 0) {
    dimension.runCommand(`setblock ${location.x} ${location.y} ${location.z} ${blockName} ${data}`);
}
