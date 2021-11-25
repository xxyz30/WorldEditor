import { world } from "mojang-minecraft";
export function getWorld() {
    return world;
}
var dimensions = [
    getWorld().getDimension("overworld"),
    getWorld().getDimension("nether"),
    getWorld().getDimension("the end")
];
export function getDimension(t) {
    return dimensions[t];
}
export function getEvents() {
    return world.events;
}
