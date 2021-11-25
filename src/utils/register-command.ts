import 'mojang-minecraft';
import { Player } from 'mojang-minecraft';
import './utils.js'
import { factory } from './utils.js';

export class RegisterCommand {
    /**
     * how did the command start,default = '.'
     */
    public static startChar: string = '.'

    public static register(params: string, callBack: (data: CommandResponse) => any) {

        factory.getEvents().beforeChat.subscribe(e => {
            if (!e.message.startsWith(this.startChar)) return
            e.cancel = true
            let args: string[] = e.message.split(' ').slice(1)
            callBack(new CommandResponse(e.sender, args))
        })
    }

}
export class CommandResponse {
    public player: Player
    public args: string[]
    constructor(player: Player = null, args: string[] = []) {
        this.player = player
        this.args = args
    }
}