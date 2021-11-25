import { CommandResponse, RegisterCommand } from "../utils/register-command.js";
import * as utils from '../utils/utils.js'
import { WorldEditorCore } from "../core/core.js";

export function registerCommand(core: WorldEditorCore) {
    let commands = [
        {
            command: 'set',
            running: function (e: CommandResponse) {
                core.doSet(e.args[0], e.args[1], e.player)
            }
        }
    ]
    commands.forEach(e => {
        RegisterCommand.register(e.command, e.running)
    });
}
