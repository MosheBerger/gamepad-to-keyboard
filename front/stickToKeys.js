import { GamepadController } from "./gamepadClass/Gamepad.js";
/**
 * 
 * @param {GamepadController} gamepad 
 * @param {'left', 'right'} side 
 * @returns 
 */


export function stickToKeys(gamepad, side) {

    if (!gamepad) { return }

    
    const dir = {
        x: gamepad.getAxes(`${side}StickX`),
        y: gamepad.getAxes(`${side}StickY`),
    }

    // console.log('dir', dir);

    const deadZone = gamepad.AXES_DEAD_ZONE
    const middle = gamepad.AXES_MIDDLE

    let stickPosition = 'middle'

    if (dir.x > deadZone) stickPosition = 'middleRight'
    if (dir.x > middle) stickPosition = 'right'

    if (dir.x < -deadZone) stickPosition = 'middleLeft'
    if (dir.x < -middle) stickPosition = 'left'

    if (dir.y > middle-0.1) stickPosition = 'down'
    if (dir.y < -middle+0.1) stickPosition = 'up'

    return stickPosition
}