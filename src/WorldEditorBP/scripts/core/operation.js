import { addOperation } from './bus/data-bus.js';
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
    redo(callback) {
        console.log("RODO_________________");
        addOperation(this, callback);
    }
    /**
     * undo
     */
    undo(callback) {
        console.log("UNDO_________________________");
        let a = new Operation(this.dimension);
        a.history = this.future;
        a.future = this.history;
        addOperation(a, callback);
    }
}
