export function setBlockByInstance(block, data = 0) {
    block.dimension.runCommand(`setblock ${block.x} ${block.y} ${block.z} ${block.id} ${data}`);
}
export function setBlockById(dimension, blockName, location, data = 0) {
    dimension.runCommand(`setblock ${location.x} ${location.y} ${location.z} ${blockName} ${data}`);
}
