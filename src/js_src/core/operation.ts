import * as mc from 'mojang-minecraft';
import * as utils from '../utils/utils.js';
import { BlockData } from './block-data.js'
import { addOperation, BusCallBackData } from './bus/data-bus.js';
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
    public redo(callback: (data: BusCallBackData) => void) {
        console.log("RODO_________________");
        addOperation(this, callback)
    }

    /**
     * undo
     */
    public undo(callback: (data: BusCallBackData) => void){
        console.log("UNDO_________________________");
        let a = new Operation(this.dimension)
        a.history = this.future
        a.future = this.history
        addOperation(a, callback)
    }
}