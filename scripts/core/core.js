import * as utils from '../utils/utils.js';
import { tipText } from '../texts/texts.js';
import { AreaMode } from "../core/precinct/area-mode.js";
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
        this.fetureStack = [];
    }
    /**
     * redo
     * 重做
     */
    redo() {
        if (this.fetureStack.length > 0) {
            let i = this.fetureStack.pop();
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
            if (i.redo()) {
                utils.tellrawTranslation(tipText.undo_success);
                this.fetureStack.push(i);
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
    setArea(node1, node2) {
        //目前只有立方体方式选择区域
        this.area = node1.blocksBetween(node2);
    }
    /**
     * copy
     */
    copy() {
    }
    /**
     * paste
     */
    paste() {
    }
    /**
     * clearClipboard
     */
    clearClipboard() {
    }
    /**
     * doSet
     * 填充某种方块
     */
    doSet(blockName, data, player) {
        try {
            this.area.forEach(i => {
                try {
                    utils.Commands.setBlockById(player.dimension, blockName, i, data);
                }
                catch (ex) {
                }
            });
            utils.tellrawTranslation(tipText.doSet_success);
        }
        catch (ex) {
            utils.tellrawTranslation(tipText.doSet_fail);
        }
    }
}
