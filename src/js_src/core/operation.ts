import * as mc from 'mojang-minecraft';
import * as utils from '../utils/utils.js';
import { BlockData } from './block-data.js'
/**
 * redo/undo operation
 * 他们都是按引用传递的方块，不能存储Block对象，否则它变掉了，其它也得变
 * 必须存储的是方块置换的拷贝
 */
export class Operation {
    history: BlockData[] = []
    future: BlockData[] = []
    dimension: mc.Dimension
    constructor(dimension: mc.Dimension) {
        this.dimension = dimension
    }
    /**
     * redo
     */
    public redo(): boolean {
        this.future.forEach((block) => {
            let b = this.dimension.getBlock(block.location)
            b.setPermutation(block.permutation)
        })
        return true
    }

    /**
     * undo
     */
    public undo(): boolean {
        utils.tellrawText("运行重做")
        this.history.forEach(block => {
            utils.tellrawText(block.id)
            let b: mc.Block = this.dimension.getBlock(block.location)
            b.setPermutation(block.permutation)
        })
        return true
    }
}