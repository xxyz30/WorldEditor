import { Location, BlockLocation } from 'mojang-minecraft';
function blockLocationToLocation(l) {
    return new Location(l.x, l.y, l.z);
}
function locationToBlockLocation(l) {
    return new BlockLocation(Math.floor(l.x), Math.floor(l.y), Math.floor(l.z));
}
export { blockLocationToLocation, locationToBlockLocation };
