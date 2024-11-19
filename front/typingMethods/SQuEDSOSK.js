// split quadrant elastic dual stick on-screen keyboard
// SQuEDSOSK


import { GamepadController } from "../gamepadClass/Gamepad.js";
import TypingMethod from "./index.js";
import { send } from "../utils/sendTextAndKeys.js";
import { stickPosition } from "../utils/stickPosition.js";


/**
 * @typedef {'middle' | 'middleLeft' | 'middleRight' | 'left' | 'right' | 'up' | 'down' } StickPosition
 */

/** 
 * @type {Record<'left' | 'right', StickPosition[]>}
*/
const posQueue = {
    left: [],
    right: [],
}
const lasPosQueue = {
    left: [],
    right: [],
}


/**\
 * @param {GamepadController} gamepad
 * @param {'left', 'right'} side
 */
function gamepadToKeyboard(gamepad, side) {

    const stickPos = stickPosition(gamepad, side)


    if (stickPos.includes('middle')) {
        posQueue[side][0] = stickPos
        posQueue[side].length = 1

    } else {
        if (
            posQueue[side][0]?.includes('middle') ||
            posQueue[side].length === 2
        ) {
            posQueue[side].pop()
        }

        posQueue[side].push(stickPos)
    }


    let [firstPos, secondPos] = posQueue[side]
    if (!secondPos) {
        secondPos = firstPos
    }


    let [lastFirstPos, lastSecondPos] = lasPosQueue[side]
    if (
        firstPos === lastFirstPos
        && secondPos === lastSecondPos
    ) {
        return
    }

    lasPosQueue[side] = [firstPos, secondPos]

    // console.log(side, posQueue[side]);

    drawActiveArea(side, firstPos, secondPos)
}


function drawActiveArea(keyboardSide, activeAreaPos, selectorPos) {

    const keyboardElement = document.querySelector(`.keyboard-${keyboardSide}`)

    keyboardElement.querySelectorAll(`.key:not(.${activeAreaPos}.-${selectorPos})`).forEach(k => {
        k.classList.remove('selector')
    })

    keyboardElement.querySelectorAll(`.key:not(.${activeAreaPos})`).forEach(k => {
        k.classList.remove('active-area')
    })

    keyboardElement.querySelectorAll(`.${activeAreaPos}`).forEach(k => {
        k.classList.add('active-area')
    })

    keyboardElement.querySelectorAll(`.${activeAreaPos}.-${selectorPos}`).forEach(k => {
        k.classList.add('selector')
    })

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



class SQuEDSOSK extends TypingMethod {

    init() {


        this.gamepad.on({ type: 'axes', axes: "leftStickX" }, (gp) => {
            gamepadToKeyboard(gp, 'left')
        })

        this.gamepad.on({ type: 'axes', axes: "rightStickX" }, (gp) => {
            gamepadToKeyboard(gp, 'right')
        })


        this.gamepad.on({ type: 'button', button: 'shoulderL', is: 'pressed' }, () => {
            selectorClick('left')
        })

        this.gamepad.on({ type: 'button', button: 'shoulderR', is: 'pressed' }, () => {
            selectorClick('right')
        })

        

    }
}


export default SQuEDSOSK