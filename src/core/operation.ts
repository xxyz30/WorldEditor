import * as mc from 'mojang-minecraft';
import * as utils from '../utils/utils.js';
/**
 * redo/undo operation
 */
export class Operation {
    history: mc.Block[]
    feture: mc.Block[]
    dimension: mc.Dimension
    /**
     * redo
     */
    public redo(): boolean {
        this.feture.forEach((block) => {
            let b = this.dimension.getBlock(new mc.BlockLocation(block.x, block.y, block.z))
            b.setPermutation(block.permutation)
        })
        return true
    }

    /**
     * undo
     */
    public undo(): boolean {
        this.history.forEach((block) => {
            let b = this.dimension.getBlock(new mc.BlockLocation(block.x, block.y, block.z))
            b.setPermutation(block.permutation)
        })
        return true
    }
}