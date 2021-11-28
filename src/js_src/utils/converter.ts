import { Location, BlockLocation, Block } from 'mojang-minecraft'
function blockLocationToLocation(l: BlockLocation): Location {
    return new Location(l.x, l.y, l.z)
}
function locationToBlockLocation(l: Location): BlockLocation {
    return new BlockLocation(Math.floor(l.x), Math.floor(l.y), Math.floor(l.z))
}
/**
 * name -> minecraft:name
 * namespace:name -> namespace:name
 * @param name name
 */
function namespaceFormat(name: string): string {
    if (name.split(":").length >= 2) {
        return name
    }else{
        return 'minecraft:' + name
    }
}
export { blockLocationToLocation, locationToBlockLocation, namespaceFormat }