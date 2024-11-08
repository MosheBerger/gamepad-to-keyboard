/** @import {GpEvent, GpEventCallback} from './types.d.ts' */
/** @import {GamepadController} from "./Gamepad" */


export class GpEventObj {

    /**
     *  @param {GamepadController} gamepad - The type of event can be one of the following: 'onPress', 'whilePressed', 'onRelease', 'whileReleased' 
     * @param {GpEvent} event - The type of event can be one of the following: 'onPress', 'whilePressed', 'onRelease', 'whileReleased' 
     * @param {GpEventCallback} callback - The function to call when the event is triggered 
     */
    constructor(gamepad, event, callback) {
        this.gamepad = gamepad
        this.eventType = event
        this.callback = callback
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
        console.log('btnState', btnState);
        console.log('getEventState', getEventState);

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
