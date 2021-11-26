import * as utils from '../utils/utils.js';
/**
 * redo/undo operation
 * 他们都是按引用传递的方块，不能存储Block对象，否则它变掉了，其它也得变
 * 必须存储的是方块置换的拷贝
 */
export class Operation {
    constructor(dimension) {
        this.history = [];
        this.future = [];
        this.dimension = dimension;
    }
    /**
     * redo
     */
    redo() {
        this.future.forEach((block) => {
            let b = this.dimension.getBlock(block.location);
            b.setPermutation(block.permutation);
        });
        return true;
    }
    /**
     * undo
     */
    undo() {
        utils.tellrawText("运行重做");
        this.history.forEach(block => {
            utils.tellrawText(block.id);
            let b = this.dimension.getBlock(block.location);
            b.setPermutation(block.permutation);
        });
        return true;
    }
}
