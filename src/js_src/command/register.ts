import { CommandResponse, RegisterCommand } from "../utils/register-command.js";
import * as utils from '../utils/utils.js'
import { WorldEditorCore } from "../core/core.js";

export function registerCommand(core: Map<string, WorldEditorCore>) {
    let commands = [
        {
            command: 'set',
            running: function (e: CommandResponse) {
                core.get(e.player.nameTag).doSet(e)
            }
        },
        {
            command: 'copy',
            running: function (e: CommandResponse) {
                core.get(e.player.nameTag).copy(e)
            }
        },
        {
            command: 'paste',
            running: function (e: CommandResponse) {
                core.get(e.player.nameTag).paste(e)
            }
        },
        {
            command: 'redo',
            running: function (e: CommandResponse){
                core.get(e.player.nameTag).redo(e)
            }
        },
        {
            command: 'undo',
            running: function (e: CommandResponse){
                core.get(e.player.nameTag).undo(e)
            }
        },
        {
            command: 'replace',
            running: function(e: CommandResponse){
                core.get(e.player.nameTag).replace(e)
            }
        }
    ]
    commands.forEach(e => {
        RegisterCommand.register(e.command, e.running)
    });
}
