import TypingMethod from "./index.js"
import { selectKeyboard } from "../utils/mapKeyboards.js"
import { send } from "../utils/sendTextAndKeys.js"

class BasicButtons extends TypingMethod {
    init() {

        let keyboardIndexCounter2 = 1
        this.gamepad.on({ type: 'button', button: 'select', is: 'pressed' }, () => {

            selectKeyboard(keyboardIndexCounter2)
            keyboardIndexCounter2++
        })


        const keys = ['delete', 'backspace', 'enter', 'space']
        const buttons = ['faceNorth', 'faceSouth', 'faceEast', 'faceWest']

        buttons.forEach((button, i) => {
            this.gamepad.on({ type: 'button', button, is: 'pressed' }, () => {
                send.key(keys[i])
                console.log('sending', keys[i]);
            })
        })
    }
}


export default BasicButtons