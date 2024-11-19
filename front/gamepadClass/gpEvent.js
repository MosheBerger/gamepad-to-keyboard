/** @import {GpEvent, GpEventCallback} from './types.ts' */
/** @import {GamepadController} from "./Gamepad.js" */


export class GpEventObj {

    /**
     *  @param {GamepadController} gamepad - The type of event can be one of the following: 'onPress', 'whilePressed', 'onRelease', 'whileReleased' 
     * @param {GpEvent} event - The type of event can be one of the following: 'onPress', 'whilePressed', 'onRelease', 'whileReleased' 
     * @param {GpEventCallback} callback - The function to call when the event is triggered 
     * @param {string} [description] - The function to call when the event is triggered 
     */
    constructor(gamepad, event, callback, description) {
        this.gamepad = gamepad
        this.eventType = event
        this.callback = callback
        this.id = Symbol(description)
        // todo i'm here
    }


    checkAndRun() {
        const {gamepad, eventType:{type} } = this

        if (!gamepad) { return }

        switch (type) {
            case 'update':
                this.#runUpdateEvent()
                break

            case 'axes':
                this.#runAxesEvent()
                break

            case 'button':
                this.#runButtonEvent()
                break
        }
    }


    #runAxesEvent() {
        const { gamepad, eventType: { axes } } = this

        if (gamepad.getAxes(axes) === undefined) { return }

        this.#runCallback(gamepad)
    }


    #runButtonEvent() {

        const {
            gamepad,
            eventType: {
                button: buttonName,
                is: btnState
            }
        } = this

        const eventStates = {
            pressed: 'isButtonPressed',
            released: 'isButtonReleased',
            up: 'isButtonUp',
            down: 'isButtonDown'
        }
        
        
        const getEventState = eventStates[btnState]

        if (!gamepad[getEventState](buttonName)) { return }

        this.#runCallback(gamepad)

    }

    #runUpdateEvent(gamepad) {
        this.#runCallback(gamepad)
    }


    #runCallback(gamepad) {
        this.callback(gamepad)
    }

}

// const event = new GpEventObj(
//     new GamepadController(),
//     { type: 'button', is: 'press', button: 'faceNorth' },
//     (gamepad) => console.log(gamepad.isButtonPressed('faceNorth'))
// )
