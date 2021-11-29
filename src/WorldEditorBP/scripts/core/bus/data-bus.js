import * as utils from '../../utils/utils.js';
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
let maxBlockEveryTick = 1000;
//需要进行操作的队列
let operationQueue = [];
//完成后进行的callback操作
let finishedCallbackQueue = [];
//目前进度的操作
let currentProgress;
//目前操作已经完成的方块数量
let currentBlockCount = 0;
/**
 * 添加一个新操作
 */
export function addOperation(op, callback) {
    operationQueue.push(op);
    finishedCallbackQueue.push(callback);
}
utils.Factory.getEvents().tick.subscribe(e => {
    if (operationQueue.length <= 0 || currentProgress === null)
        return;
    //有东西
    //如果目前的进度已经完成，则
    if (currentProgress !== null)
        currentProgress = operationQueue.shift();
    //取这个操作的currentBlockCount到currentBlockCount + maxBlockEveryTick范围的对象
    let handelHistoryList = currentProgress.history.slice(currentBlockCount, currentBlockCount + maxBlockEveryTick);
    let handelFutureList = currentProgress.future.slice(currentBlockCount, currentBlockCount + maxBlockEveryTick);
    handelHistoryList.forEach((item, i) => {
        item.block.setPermutation(handelFutureList[i].permutation);
    });
    if (currentProgress.history.length - currentBlockCount > 0) {
        //若是剩余还有，则处理完成这max个，否则是这次就做完了，变成0，并callback
        currentBlockCount += maxBlockEveryTick;
    }
    else {
        currentBlockCount = 0;
        finishedCallbackQueue.shift()();
    }
});
