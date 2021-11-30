import { Location, BlockLocation, Block } from 'mojang-minecraft'
export function blockLocationToLocation(l: BlockLocation): Location {
    return new Location(l.x, l.y, l.z)
}
export function locationToBlockLocation(l: Location): BlockLocation {
    return new BlockLocation(Math.floor(l.x), Math.floor(l.y), Math.floor(l.z))
}
/**
 * name -> minecraft:name
 * namespace:name -> namespace:name
 * @param name name
 */
export function namespaceFormat(name: string): string {
    if (name.split(":").length >= 2) {
        return name
    }else{
        return 'minecraft:' + name
    }
}
export function isNullOrUndefined<T, V>(testObject:T, ifNullOrUndefinedReturnObject:V):(T | V){
    if(testObject == null){
        return ifNullOrUndefinedReturnObject
    }else{
        return testObject
    }
}