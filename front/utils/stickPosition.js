// import { GamepadController } from "../gamepadClass/Gamepad.js";

/**
 * @param {import('../gamepadClass/Gamepad.js').GamepadController} gamepad 
 * @param {'left' | 'right'} side 
 * @returns 
 */
export function stickPosition(gamepad, side, middleLR = false, middleUD = false) {

    if (!gamepad) { return }


    const dir = {
        x: gamepad.getAxes(`${side}StickX`),
        y: gamepad.getAxes(`${side}StickY`),
    }

    // console.log('dir', dir);

    const deadZone = gamepad.AXES_DEAD_ZONE
    const middle = gamepad.AXES_MIDDLE

    let stickPosition = 'middle'

    
    if (dir.x > deadZone) stickPosition = 'right'
    if (dir.x < -deadZone) stickPosition = 'left'
    if (dir.y > deadZone) stickPosition = 'down'
    if (dir.y < -deadZone) stickPosition = 'up'


    if (middleLR) {
        if (dir.x > deadZone) stickPosition = 'middleRight'
        if (dir.x > middle) stickPosition = 'right'

        if (dir.x < -deadZone) stickPosition = 'middleLeft'
        if (dir.x < -middle) stickPosition = 'left'
    }

    if (middleUD) {
        if (dir.y > deadZone) stickPosition = 'middleDown'
        if (dir.y > middle) stickPosition = 'down'

        if (dir.x < -deadZone) stickPosition = 'middleUp'
        if (dir.y < -middle) stickPosition = 'up'
    }


    return stickPosition
}

