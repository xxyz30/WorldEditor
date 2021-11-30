import { BlockLocation } from 'mojang-minecraft';
import { setBlockById } from '../utils/commands/commandManager.js';
/**
 * 因为mojang自带的block类如果对应方块被替换掉，
 * 那么这个实例的内容也会被替换
 * 这个类用于解决替换的问题
 */
export class BlockData {
    constructor(block) {
        this.id = block.id;
        this.location = block.location;
        this.permutation = block.permutation.clone();
        this.block = block;
    }
    equals(block) {
        // console.log(JSON.stringify(this.permutation.getAllProperties()))
        // console.log(JSON.stringify(block.permutation.getAllProperties()))
        let l = block.permutation.getProperty("colors");
        console.log(JSON.stringify(l));
    }
    /**
     * 用于从ID获得BlockData的实例
     */
    static getBlockById(blockName, blockData, player) {
        let dim = player.dimension;
        let l = new BlockLocation(player.location.x, 0, player.location.z);
        let block = dim.getBlock(l);
        try {
            let hisBlock = block.permutation.clone();
            setBlockById(player.dimension, blockName, l, blockData);
            let currBlock = new BlockData(block);
            block.setPermutation(hisBlock);
            return currBlock;
        }
        catch (ex) {
            console.log(ex);
            ex = JSON.parse(ex);
            if (ex.statusCode === -2147352576) {
                return new BlockData(block);
            }
            else {
                throw ex;
            }
        }
    }
    toSting() {
        return this.id;
    }
}
