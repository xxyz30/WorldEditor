import * as mc from 'mojang-minecraft';
/**
 * redo/undo operation
 */
export class Operation {
    /**
     * redo
     */
    redo() {
        this.feture.forEach((block) => {
            let b = this.dimension.getBlock(new mc.BlockLocation(block.x, block.y, block.z));
            b.setPermutation(block.permutation);
        });
        return true;
    }
    /**
     * undo
     */
    undo() {
        this.history.forEach((block) => {
            let b = this.dimension.getBlock(new mc.BlockLocation(block.x, block.y, block.z));
            b.setPermutation(block.permutation);
        });
        return true;
    }
}
