import { RegisterCommand } from "../utils/register-command.js";
export function registerCommand(core) {
    let commands = [
        {
            command: 'set',
            running: function (e) {
                core.doSet(e.args[0], e.args[1], e.player);
            }
        }
    ];
    commands.forEach(e => {
        RegisterCommand.register(e.command, e.running);
    });
}
