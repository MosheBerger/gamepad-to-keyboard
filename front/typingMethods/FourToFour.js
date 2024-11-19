// import { GamepadController } from "../gamepadClass/Gamepad.js";
import TypingMethod from "./index.js";
import { send } from "../utils/sendTextAndKeys.js";
import { stickPosition } from "../utils/stickPosition.js";

const leftKeyboard = document.querySelector('.keyboard-left')
const rightKeyboard = document.querySelector('.keyboard-right')

const elements = {
    keyboardLeftElements: {
        'left': leftKeyboard.querySelectorAll('.keyboard-left .left'),
        'right': leftKeyboard.querySelectorAll('.keyboard-left .right'),
        'up': leftKeyboard.querySelectorAll('.keyboard-left .up'),
        'down': leftKeyboard.querySelectorAll('.keyboard-left .down'),

        '-left': leftKeyboard.querySelectorAll('.keyboard-left .-left'),
        '-right': leftKeyboard.querySelectorAll('.keyboard-left .-right'),
        '-up': leftKeyboard.querySelectorAll('.keyboard-left .-up'),
        '-down': leftKeyboard.querySelectorAll('.keyboard-left .-down'),
    },
    keyboardRightElements: {
        'left': rightKeyboard.querySelectorAll('.keyboard-right .left'),
        'right': rightKeyboard.querySelectorAll('.keyboard-right .right'),
        'up': rightKeyboard.querySelectorAll('.keyboard-right .up'),
        'down': rightKeyboard.querySelectorAll('.keyboard-right .down'),

        '-left': rightKeyboard.querySelectorAll('.keyboard-right .-left'),
        '-right': rightKeyboard.querySelectorAll('.keyboard-right .-right'),
        '-up': rightKeyboard.querySelectorAll('.keyboard-right .-up'),
        '-down': rightKeyboard.querySelectorAll('.keyboard-right .-down'),
    },
    allKeys: document.querySelectorAll('.key')
}

/**
 * @typedef {'middle' | 'middleLeft' | 'middleRight' | 'left' | 'right' | 'up' | 'down' } StickPosition
 */


function drawActiveArea(keyboardSide, activeAreaPos, selectorPos) {

    const keyboardElement = elements[`keyboard${keyboardSide === 'left' ? 'Left' : 'Right'}Elements`] //document.querySelector(`.keyboard-${keyboardSide}`)

    // keyboardElement.querySelectorAll(`.key:not(.${activeAreaPos}.-${selectorPos})`).forEach(k => {
    //     k.classList.remove('selector')
    // })

    // keyboardElement.querySelectorAll(`.key:not(.${activeAreaPos})`).forEach(k => {
    //     k.classList.remove('active-area')
    // })

    elements.allKeys.forEach(k => {
        k.classList.remove('active-area')
        k.classList.remove('selector')
    })

    if (!activeAreaPos) { return }

    keyboardElement[activeAreaPos].forEach(k => {
        k.classList.add('active-area')
    })

    // keyboardElement.querySelectorAll(`.${activeAreaPos}`).forEach(k => {
    //     k.classList.add('active-area')
    // })

    document.querySelector(`.keyboard-${keyboardSide} .${activeAreaPos}.-${selectorPos}`).classList.add('selector')

}


let first = ''
let waitForLeave = false
function typeWithTwoSticks(gamepad) {

    const LS = stickPosition(gamepad, 'left')
    if (!first && LS !== 'middle') { first = 'LS' }


    const RS = stickPosition(gamepad, 'right')
    if (!first && RS !== 'middle') { first = 'RS' }


    if (LS === 'middle' && RS === 'middle') {
        first = ''
        drawActiveArea('left', 'middle', 'middle')
        drawActiveArea('right', 'middle', 'middle')
        return
    }
    console.log('first:', first, 'LS:', LS, 'RS:', RS);


    if (first === 'LS') {
        drawActiveArea('left', LS, RS)

        if (RS === 'middle') {
            waitForLeave = false
            return
        }

        if (waitForLeave) { return }

        selectorClick('left')
        waitForLeave = true

    }

    if (first === 'RS') {
        drawActiveArea('right', RS, LS)

        if (LS === 'middle') {
            waitForLeave = false
            return
        }

        if (waitForLeave) { return }

        selectorClick('right')
        waitForLeave = true
    }
}


function selectorClick(side) {

    const keyboardElement = document.querySelector(`.keyboard-${side}`)
    const key = keyboardElement.querySelector(`.selector`)
    const text = key.textContent

    key.classList.add('clicked')
    setTimeout(() => key.classList.remove('clicked'), 200)


    if (text.length > 1) {
        send.text(text)
    } else {
        send.key(text)
    }

    console.log('sending', text);
}





class FourToFour extends TypingMethod {


    init() {

        this.gamepad.on({ type: 'axes', axes: "leftStickX" }, (gp) => {
            // gamepadToKeyboard(gp, 'left')

            typeWithTwoSticks(gp)

        })

        //this.gamepad.on({ type: 'axes', axes: "rightStickX" }, (gp) => {
        //     gamepadToKeyboard(gp, 'right')
        // })


        this.gamepad.on({ type: 'button', button: 'shoulderL', is: 'pressed' }, (gp) => {
            selectorClick('left')
        })

        this.gamepad.on({ type: 'button', button: 'shoulderR', is: 'pressed' }, (gp) => {
            selectorClick('right')
        })


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

export default FourToFour