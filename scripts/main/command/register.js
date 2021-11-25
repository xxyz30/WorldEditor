import { RegisterCommand } from "../../utils/register-command.js";
import * as utils from '../../utils/utils.js';
RegisterCommand.register('test', e => {
    utils.tellrawText('指令执行成功！');
});
