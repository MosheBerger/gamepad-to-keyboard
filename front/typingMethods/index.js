//! use as a abstract class

import { GamepadController } from "../gamepadClass/Gamepad.js"

class TypingMethod {

    /**
     * @type {GamepadController} gp - The gamepad controller to use
    */
    gamepad    

    constructor(gp){
        this.gamepad = gp || new GamepadController()
    }

    init() { }
    
    close() {
        this.gamepad.removeAllEvents()
    }
}

export default TypingMethod