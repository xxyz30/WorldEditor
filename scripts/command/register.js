import { RegisterCommand } from "../utils/register-command.js";
export function registerCommand(core) {
    let commands = [
        {
            command: 'set',
            running: function (e) {
                core.doSet(e.args[0], e.args[1], e.player);
            }
        },
        {
            command: 'copy',
            running: function (e) {
                core.copy();
            }
        },
        {
            command: 'paste',
            running: function (e) {
                core.paste(e.player);
            }
        },
        {
            command: 'redo',
            running: function (e) {
                core.redo();
            }
        },
        {
            command: 'undo',
            running: function (e) {
                core.undo();
            }
        }
    ];
    commands.forEach(e => {
        RegisterCommand.register(e.command, e.running);
    });
}
