import { Operation } from '../operation';
import { Events, MinecraftBlockTypes, World, world } from 'mojang-minecraft';
import * as utils from '../../utils/utils.js';
import { BusCallBackData } from './bus-callback.js';

/**
 * do the thing every tick
 * 添加一个新操作，放到数组队列里，然后每个tick执行一个小操作
 * 每个操作最多maxBlockEveryTick个方块
 * 操作中，包括被替换的位置、
 * 
 */

/**
 * 每个Tick最多执行多少个方块
 */
let maxBlockEveryTick = 300
//需要进行操作的队列
let operationQueue: Operation[] = []
//完成后进行的callback操作
let finishedCallbackQueue: Function[] = []
//目前进度的操作
let currentProgress: Operation = null
//目前操作已经完成的方块数量
let currentBlockCount: number = 0
/**
 * 添加一个新操作
 */
function addOperation(op: Operation, callback: (data: BusCallBackData) => void) {
    operationQueue.push(op)
    finishedCallbackQueue.push(callback)
}

utils.Factory.getEvents().tick.subscribe(e => {
    if (operationQueue.length <= 0 && currentProgress === null) return
    // console.log("还有任务");
    //有东西
    //如果目前的进度已经完成，则
    if (currentProgress === null) currentProgress = operationQueue.shift()
    //取这个操作的currentBlockCount到currentBlockCount + maxBlockEveryTick范围的对象
    let handelHistoryList = currentProgress.history.slice(currentBlockCount, currentBlockCount + maxBlockEveryTick)
    let handelFutureList = currentProgress.future.slice(currentBlockCount, currentBlockCount + maxBlockEveryTick)
    console.log("future");
    console.log(JSON.stringify(handelFutureList));
    console.log(handelFutureList[0].block.id);
    console.log("history");
    console.log(JSON.stringify(handelHistoryList));
    console.log(handelHistoryList[0].block.permutation);
    handelHistoryList.forEach((item, i) => {
        item.block.setPermutation(handelFutureList[i].permutation)
        // item.block.setPermutation(MinecraftBlockTypes.wool.createDefaultBlockPermutation())
    })
    currentBlockCount += maxBlockEveryTick
    if (currentProgress.history.length - currentBlockCount <= 0) {
        console.log("任务完成");
        // console.log(currentProgress.history.length);
        // console.log(currentProgress.history.length);
        // console.log(currentBlockCount);
        currentBlockCount = 0
        try {
            finishedCallbackQueue.shift()({ success: true, op: currentProgress, successTimes: currentProgress.future.length })
        }
        catch(ex){
            console.log(ex);
        }
        currentProgress = null
    }
})
export { addOperation, BusCallBackData }