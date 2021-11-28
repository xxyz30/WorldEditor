import * as mc from 'mojang-minecraft';
import { Operation } from './operation.js';
import * as utils from '../utils/utils.js'
import { tipText } from '../texts/texts.js'
import { AreaMode } from "../core/precinct/area-mode.js";
import { BlockData } from './block-data.js';
import { CommandResponse } from '../utils/register-command';

export class WorldEditorCore {
    //选取选取方式
    areaMode: AreaMode = AreaMode.cuboid

    //节点1
    node1: mc.BlockLocation
    //节点2
    node2: mc.BlockLocation
    //选区
    area: mc.BlockLocation[] = []
    //剪贴板
    clipBoard: BlockData[] = []
    //历史记录栈
    historyStack: Operation[] = []
    //撤销后的栈
    futureStack: Operation[] = []
    //选区的维度
    dimension: mc.Dimension
    /**
     * redo
     * 重做
     */
    public redo(args:CommandResponse) {
        if (this.futureStack.length > 0) {
            let i = this.futureStack.pop()
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
    public undo(args:CommandResponse) {
        if (this.historyStack.length > 0) {
            let i = this.historyStack.pop()
            if (i.undo()) {
                utils.tellrawTranslation(tipText.undo_success)
                this.futureStack.push(i)
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
    public setArea(node1: mc.BlockLocation, node2: mc.BlockLocation, dimension: mc.Dimension) {
        //目前只有立方体方式选择区域
        this.area = node1.blocksBetween(node2)
        this.dimension = dimension
        this.node1 = node1
        this.node2 = node2
    }
    /**
     * copy
     */
    public copy(args:CommandResponse) {
        this.clipBoard = this.getAreaBlock()
        utils.tellrawTranslation(tipText.copy_success)
    }

    /**
     * paste
     * 玩家复制后，存储到数组里
     * 粘贴后，从数组里取值
     * 开始点为玩家所在位置点，然后计算剪贴板内的每个方块和node1的差值，填充到玩家点附近的方块里
     */
    public paste(args:CommandResponse) {
        if (this.clipBoard.length == 0) return
        let op = new Operation(args.player.dimension)
        let origin = utils.Converter.locationToBlockLocation(args.player.location)

        // op.history = this.getAreaBlock(fillArea)

        this.clipBoard.forEach(i => {
            //计算本次循环的块和源点的偏移
            let x = i.location.x - this.node1.x
            let y = i.location.y - this.node1.y
            let z = i.location.z - this.node1.z
            let block = args.player.dimension.getBlock(origin.offset(x, y, z))
            op.history.push(new BlockData(block))
            block.setPermutation(i.permutation)
            op.future.push(new BlockData(block))
        });
        this.historyStack.push(op)
        this.futureStack.length = 0
        utils.tellrawTranslation(tipText.paste_success)
    }
    /**
     * replace
     */
    public replace(args:CommandResponse){
        if(args.args.length === 0){
            utils.tellrawTranslation(tipText.replace_fail)
            utils.tellrawText("参数为0")
            return
        }
        let op = new Operation(this.dimension)
        let replaceBlock = args.args[0]
        let replaceData = args.args[1]
        let replacedBlock = args.args[2]
        let replacedData = args.args[3]

        this.area.forEach(i =>{
            op.history.push(new BlockData(this.dimension.getBlock(i)))
            utils.Commands.fillBlockById(this.dimension, i, replaceBlock, replaceData, replacedBlock, replacedData)
            op.future.push(new BlockData(this.dimension.getBlock(i)))
        })
        //TODO
        utils.tellrawTranslation(tipText.replace_success)

        this.futureStack.length = 0
        this.historyStack.push(op)
    }
    /**
     * clearClipboard
     */
    public clearClipboard(args:CommandResponse) {
        this.clipBoard.length = 0
    }
    /**
     * doSet
     * 填充某种方块
     */
    public doSet(args:CommandResponse) {
        //将操作记录
        let op = new Operation(this.dimension)

        let err: number = 0
        let ok: number = 0
        let blockName = args.args[0]
        let data = args.args[1]
        try {
            this.area.forEach(i => {
                try {
                    //修改前的方块压进去
                    op.history.push(new BlockData(this.dimension.getBlock(i)))
                    utils.Commands.setBlockById(this.dimension, blockName, i, data)
                    ok++
                    //将修改的方块压进去
                    op.future.push(new BlockData(this.dimension.getBlock(i)))
                } catch (ex) {
                    if (ex.statusCode == -2147483648) throw ex
                    err++
                }
            });
        } catch (ex) {
            utils.tellrawTranslation(tipText.doSet_fail)
        }
        if (err <= 0) {
            utils.tellrawTranslation(tipText.doSet_success, [ok.toString()])
        } else {
            utils.tellrawTranslation(tipText.doSet_some_success, [ok.toString(), err.toString()])
        }
        this.futureStack.length = 0
        this.historyStack.push(op)
    }

    /**
     * getSize
     * 获取方块个数
     */
    public getSize(): mc.Location {
        //TODO
        return new mc.Location(0, 0, 0)
    }

    /**
     * get All block in BlockLocation[]
     * @param arr array of blockLocation
     */
    private getAreaBlock(arr: mc.BlockLocation[] = this.area): BlockData[] {
        let blocks: BlockData[] = []
        arr.forEach(i => {
            blocks.push(new BlockData(this.dimension.getBlock(i)))
        });
        return blocks
    }
}