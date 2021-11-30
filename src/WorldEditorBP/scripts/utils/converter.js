import { Location, BlockLocation } from 'mojang-minecraft';
export function blockLocationToLocation(l) {
    return new Location(l.x, l.y, l.z);
}
export function locationToBlockLocation(l) {
    return new BlockLocation(Math.floor(l.x), Math.floor(l.y), Math.floor(l.z));
}
/**
 * name -> minecraft:name
 * namespace:name -> namespace:name
 * @param name name
 */
export function namespaceFormat(name) {
    if (name.split(":").length >= 2) {
        return name;
    }
    else {
        return 'minecraft:' + name;
    }
}
export function isNullOrUndefined(testObject, ifNullOrUndefinedReturnObject) {
    if (testObject == null) {
        return ifNullOrUndefinedReturnObject;
    }
    else {
        return testObject;
    }
}
