import { Location, BlockLocation } from 'mojang-minecraft';
function blockLocationToLocation(l) {
    return new Location(l.x, l.y, l.z);
}
function locationToBlockLocation(l) {
    return new BlockLocation(Math.floor(l.x), Math.floor(l.y), Math.floor(l.z));
}
/**
 * name -> minecraft:name
 * namespace:name -> namespace:name
 * @param name name
 */
function namespaceFormat(name) {
    if (name.split(":").length >= 2) {
        return name;
    }
    else {
        return 'minecraft:' + name;
    }
}
export { blockLocationToLocation, locationToBlockLocation, namespaceFormat };
