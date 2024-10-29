import { GamepadController } from "./Gamepad.js";
import { gamepadLoop } from "./gamepadLoop.js";
import { selectKeyboard } from "./mapKeybords.js";
import { send } from "./sendTextAndKeys.js";
import { stickToKeys } from "./stickToKeys.js";


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

    const stickPos = stickToKeys(gamepad, side)


    if (stickPos.includes('middle')) {
        posQueue[side][0] = stickPos
        posQueue[side].length = 1

    } else {
        if (
            posQueue[side][0].includes('middle') ||
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

// todo update Gamepad class with this function
let clicked = { left: false, right: false, select: false }
/**
 * 
 * @param {GamepadController} gamepad 
 * @param {'left' | 'right'} side 
 */
function checkForSelector(gamepad, side) {

    const shoulder = side === 'left' ? 'shoulderL' : 'shoulderR'
    if (gamepad.buttonIsPressed(shoulder)) {

        if (clicked[side]) { return }

        const keyboardElement = document.querySelector(`.keyboard-${side}`)
        const key = keyboardElement.querySelector(`.selector`)
        const text = key.textContent

        key.classList.add('clicked')
        setTimeout(() => key.classList.remove('clicked'), 200)


        send.text(text)
        console.log('sending', text);

        clicked[side] = true

    } else {
        clicked[side] = false
    }
}

let keyboardIndexCounter = 1
function checkForKeyboard(gamepad) {
    
    
    if (gamepad.buttonIsPressed('select')) {
        
        if (clicked['select']) { return }
        clicked['select'] = true
        
        selectKeyboard(keyboardIndexCounter)

        keyboardIndexCounter++

    } else {
        clicked['select'] = false
    }
}

/**
 * 
 * @param {GamepadController} gamepad
 */
function checkForButtons(gamepad) {
    const keys = ['delete','backspace','enter','space']
    const buttons= ['faceNorth', 'faceSouth', 'faceEast', 'faceWest']
    
    buttons.forEach((button,i) => {
        if (gamepad.buttonIsPressed(button)) {
            
            if (clicked[button]) { return }
            clicked[button] = true
            
            send.key(keys[i])
            console.log('sending', keys[i]);
        
        } else {
            clicked[button] = false
        }
    })

}


gamepadLoop((gamepad) => {
    ['left', 'right'].forEach(side => {
        gamepadToKeyboard(gamepad, side)
        checkForSelector(gamepad, side)
    })

    checkForKeyboard(gamepad)
    checkForButtons(gamepad)
})