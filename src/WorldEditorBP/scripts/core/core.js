import * as mc from 'mojang-minecraft';
import { Operation } from './operation.js';
import * as utils from '../utils/utils.js';
import { tipText } from '../texts/texts.js';
import { AreaMode } from "../core/precinct/area-mode.js";
import { BlockData } from './block-data.js';
export class WorldEditorCore {
    constructor() {
        //选取选取方式
        this.areaMode = AreaMode.cuboid;
        //选区
        this.area = [];
        //剪贴板
        this.clipBoard = [];
        //历史记录栈
        this.historyStack = [];
        //撤销后的栈
        this.futureStack = [];
    }
    // public constructor(dim: mc.Dimension) {
    //     this.dimension = dim
    // }
    /**
     * redo
     * 重做
     */
    redo() {
        if (this.futureStack.length > 0) {
            let i = this.futureStack.pop();
            if (i.redo()) {
                utils.tellrawTranslation(tipText.redo_success);
                this.historyStack.push(i);
            }
            else {
                utils.tellrawTranslation(tipText.redo_fail);
            }
        }
        else {
            utils.tellrawTranslation(tipText.redo_fail);
        }
    }
    /**
     * undo
     * 撤销
     */
    undo() {
        if (this.historyStack.length > 0) {
            let i = this.historyStack.pop();
            if (i.undo()) {
                utils.tellrawTranslation(tipText.undo_success);
                this.futureStack.push(i);
            }
            else {
                utils.tellrawTranslation(tipText.undo_fail);
            }
        }
        else {
            utils.tellrawTranslation(tipText.undo_fail);
        }
    }
    /**
     * setArea
     */
    setArea(node1, node2, dimension) {
        //目前只有立方体方式选择区域
        this.area = node1.blocksBetween(node2);
        this.dimension = dimension;
        this.node1 = node1;
        this.node2 = node2;
    }
    /**
     * copy
     */
    copy() {
        this.clipBoard = this.getAreaBlock();
    }
    /**
     * paste
     * 玩家复制后，存储到数组里
     * 粘贴后，从数组里取值
     * 开始点为玩家所在位置点，然后计算剪贴板内的每个方块和node1的差值，填充到玩家点附近的方块里
     */
    paste(player) {
        if (this.clipBoard.length == 0)
            return;
        let op = new Operation(player.dimension);
        let origin = utils.Converter.locationToBlockLocation(player.location);
        // op.history = this.getAreaBlock(fillArea)
        this.clipBoard.forEach(i => {
            //计算本次循环的块和源点的偏移
            let x = i.x - this.node1.x;
            let y = i.y - this.node1.y;
            let z = i.z - this.node1.z;
            let block = player.dimension.getBlock(origin.offset(x, y, z));
            op.history.push(new BlockData(block));
            block.setPermutation(i.permutation);
            op.future.push(new BlockData(block));
        });
        this.historyStack.push(op);
        this.futureStack.length = 0;
    }
    /**
     * clearClipboard
     */
    clearClipboard() {
        this.clipBoard.length = 0;
    }
    /**
     * doSet
     * 填充某种方块
     */
    doSet(blockName, data, player) {
        //将操作记录
        let op = new Operation(this.dimension);
        let err = 0;
        let ok = 0;
        try {
            this.area.forEach(i => {
                try {
                    //修改前的方块压进去
                    op.history.push(new BlockData(this.dimension.getBlock(i)));
                    utils.Commands.setBlockById(this.dimension, blockName, i, data);
                    ok++;
                    //将修改的方块压进去
                    op.future.push(new BlockData(this.dimension.getBlock(i)));
                }
                catch (ex) {
                    if (ex.statusCode == -2147483648)
                        throw ex;
                    err++;
                }
            });
        }
        catch (ex) {
            utils.tellrawTranslation(tipText.doSet_fail);
        }
        if (err <= 0) {
            utils.tellrawText(ok.toString());
            utils.tellrawTranslation(tipText.doSet_success, [ok.toString()]);
        }
        else {
            utils.tellrawTranslation(tipText.doSet_some_success, [ok.toString(), err.toString()]);
        }
        this.futureStack.length = 0;
        this.historyStack.push(op);
    }
    /**
     * getSize
     * 获取方块个数
     */
    getSize() {
        //TODO
        return new mc.Location(0, 0, 0);
    }
    /**
     * get All block in BlockLocation[]
     * @param arr array of blockLocation
     */
    getAreaBlock(arr = this.area) {
        let blocks = [];
        arr.forEach(i => {
            blocks.push(this.dimension.getBlock(i));
        });
        return blocks;
    }
}