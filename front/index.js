import { GamepadController } from "./gamepadClass/Gamepad.js";
import BasicButtons from "./typingMethods/basicButtons.js";
import FourToFour from "./typingMethods/FourToFour.js";
import SQuEDSOSK from "./typingMethods/SQuEDSOSK.js";

const gp = new GamepadController()
gp.remap({ axes: { rightStickY: 5 }, buttons: { select: 8, start: 7 } })
new SQuEDSOSK(gp).init()
new BasicButtons(gp).init()

