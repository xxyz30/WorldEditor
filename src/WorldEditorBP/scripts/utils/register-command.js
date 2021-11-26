import 'mojang-minecraft';
import './utils.js';
import { Factory } from './utils.js';
export class RegisterCommand {
    static register(params, callBack) {
        Factory.getEvents().beforeChat.subscribe(e => {
            if (!e.message.startsWith(this.startChar + params))
                return;
            e.cancel = true;
            let args = e.message.split(' ').slice(1);
            callBack(new CommandResponse(e.sender, args));
        });
    }
}
/**
 * how did the command start,default = '.'
 */
RegisterCommand.startChar = '.';
export class CommandResponse {
    constructor(player = null, args = []) {
        this.player = player;
        this.args = args;
    }
}
