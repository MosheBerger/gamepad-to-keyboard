

class GpEvent {
    /**
     * @param {'press' | 'release' | 'up'| 'down'} buttonState - The type of event can be one of the following: 'onPress', 'whilePressed', 'onRelease', 'whileReleased'
     * @param {import("./Gamepad").GamepadButtonName} ButtonName - The button that triggered the event
     * @param {(button: GamepadButton)=>void} callback - The function to call when the event is triggered
    */
    constructor(eventType, button, callback) {
        this.eventType = eventType
        this.button = button
        this.callback = callback
    }
}

/**
 * Executes the callback associated with the given gamepad event.
 *
 * @param {import("./Gamepad").GamepadController} gamepad - The gamepad that triggered the event. 
 * @param {GpEvent} gpEvent - The gamepad event containing the event type, button, and callback.
*/
function runEvent(gamepad, { buttonState, buttonName, callback }) {

    const dict = {
        press:'isButtonPressed',
        release: 'isButtonReleased',
        up: 'isButtonUp',
        down: 'isButtonDown'
    }

    const event = dict[buttonState]

    if (gamepad[event](buttonName)){
        callback(gamepad.getButton())
    }
}

