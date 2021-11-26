import { Location, BlockLocation, Block } from 'mojang-minecraft'
function blockLocationToLocation(l: BlockLocation): Location {
    return new Location(l.x, l.y, l.z)
}
function locationToBlockLocation(l:Location):BlockLocation {
    return new BlockLocation(Math.floor(l.x), Math.floor(l.y), Math.floor(l.z))
}
export {blockLocationToLocation, locationToBlockLocation}