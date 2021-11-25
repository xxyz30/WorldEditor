import { World,Dimension,world, Events } from "mojang-minecraft";

export function getWorld(): World{
    return world
}

var dimensions:Dimension[] = [
    getWorld().getDimension("overworld"),
    getWorld().getDimension("nether"),
    getWorld().getDimension("the end")
]

export function getDimension(t:(0|1|2)):Dimension{
    return dimensions[t]
}
export function getEvents():Events{
    return world.events
}