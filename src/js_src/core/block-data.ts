import { Block, BlockLocation, BlockPermutation } from "mojang-minecraft"

/**
 * 因为mojang自带的block类如果对应方块被替换掉，
 * 那么这个实例的内容也会被替换
 * 这个类用于解决替换的问题
 */
export class BlockData {
    public id: string
    public location: BlockLocation
    public permutation: BlockPermutation
    public block: Block

    public constructor(block: Block) {
        this.id = block.id
        this.location = block.location
        this.permutation = block.permutation.clone()
        this.block = block
    }
}