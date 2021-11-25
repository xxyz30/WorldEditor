import * as mc from 'mojang-minecraft';
import { Operation } from './operation.js';
import * as utils from '../utils/utils.js'
import { tipText } from '../texts/texts.js'
import { AreaMode } from "../core/precinct/area-mode.js";

export class WorldEditorCore {
    //选取选取方式
    areaMode: AreaMode = AreaMode.cuboid

    //选区
    area: mc.BlockLocation[] = []
    //剪贴板
    clipBoard: mc.Block[] = []
    //历史记录栈
    historyStack: Operation[] = []
    //撤销后的栈
    fetureStack: Operation[] = []

    /**
     * redo
     * 重做
     */
    public redo() {
        if (this.fetureStack.length > 0) {
            let i = this.fetureStack.pop()
            if (i.redo()) {
                utils.tellrawTranslation(tipText.redo_success)
                this.historyStack.push(i)
            }
            else {
                utils.tellrawTranslation(tipText.redo_fail)
            }
        } else {
            utils.tellrawTranslation(tipText.redo_fail)
        }
    }
    /**
     * undo
     * 撤销
     */
    public undo() {
        if (this.historyStack.length > 0) {
            let i = this.historyStack.pop()
            if (i.redo()) {
                utils.tellrawTranslation(tipText.undo_success)
                this.fetureStack.push(i)
            }
            else {
                utils.tellrawTranslation(tipText.undo_fail)
            }
        } else {
            utils.tellrawTranslation(tipText.undo_fail)
        }
    }

    /**
     * setArea
     */
    public setArea(node1: mc.BlockLocation, node2: mc.BlockLocation) {
        //目前只有立方体方式选择区域
        this.area = node1.blocksBetween(node2)
    }
    /**
     * copy
     */
    public copy() {

    }

    /**
     * paste
     */
    public paste() {

    }
    /**
     * clearClipboard
     */
    public clearClipboard() {

    }
    /**
     * doSet
     * 填充某种方块
     */
    public doSet(blockName: string, data: number | string, player: mc.Player) {
        try {
            this.area.forEach(i => {
                try{
                    utils.Commands.setBlockById(player.dimension, blockName, i, data)
                }catch(ex){

                }
            });
            utils.tellrawTranslation(tipText.doSet_success)
        } catch (ex) {
            utils.tellrawTranslation(tipText.doSet_fail)
        }
    }
}