/** @import { GamepadButtonName, GamepadAxes,ButtonState,GpEventPayload } from './types.d.ts' */



export class GamepadController {

    /**@type {number} */ #gamepadIndex
    
    /**@type {Gamepad} */ #gamepadState
    /**@type {Gamepad} */ #gamepadLastState

    #loopInterval = null

    AXES_DEAD_ZONE = 0.2
    AXES_MIDDLE = 0.6


    constructor() {

        window.addEventListener('gamepadconnected', (e) => {
            this.#onDisconnect()
            const gamepad = e.gamepad
            this.#gamepadIndex = gamepad.index
            this.#onConnect()
        })

        window.addEventListener('gamepaddisconnected',
            this.#onDisconnect
        )

        console.log('gamepadObj', this.#gamepadState);
    }


    #onConnect() {
        console.log('gamepad connected');
        this.#loopInterval = setInterval(this.#loop, 1000 / 60)
    }
    #onDisconnect() {
        if (!this.#loopInterval) { return }

        console.log('gamepad disconnected');
        clearInterval(this.#loopInterval)
    }


    #callbacks = []

    #loop() {
        this.#updateButtonsState();

    }

    #updateButtonsState() {
        this.#gamepadLastState = this.#gamepadState
        this.#gamepadState = navigator.getGamepads()[this.#gamepadIndex];
    }


    #buttons = {
        faceNorth: 3,
        faceSouth: 0,
        faceEast: 1,
        faceWest: 2,

        dPadUp: 12,
        dPadDown: 13,
        dPadLeft: 14,
        dPadRight: 15,

        shoulderL: 4,
        shoulderR: 5,

        triggerL: 6,
        triggerR: 7,

        stickL: 10,
        stickR: 11,

        start: 8,
        select: 9,
        menu: 16
    }

    #axes = {
        leftStickX: 0,
        leftStickY: 1,
        rightStickX: 2,
        rightStickY: 3
    }


    //------BUTTONS AND AXES---------------------

    /** @param {GamepadButtonName} buttonName * @returns {ButtonState} */
    #getButtonState(buttonName) {

        const btnIndex = this.#buttons[buttonName]
        const isPressedNow = this.#gamepadState.buttons[btnIndex].pressed
        const isPressedLastTime = this.#gamepadLastState.buttons[btnIndex].pressed

        if (isPressedNow && !isPressedLastTime) return 'pressed'
        if (!isPressedNow && isPressedLastTime) return 'released'
        if (isPressedNow) return 'down'
        if (!isPressedNow) return 'up'
    }

    /** @param {GamepadButtonName} buttonName */
    isButtonPressed(buttonName) {
        const btnState = this.#getButtonState(buttonName)
        return btnState == 'pressed'
    }

    /** @param {GamepadButtonName} buttonName */
    isButtonReleased(buttonName) {
        const btnState = this.#getButtonState(buttonName)
        return btnState == 'released'
    }

    /** @param {GamepadButtonName} buttonName */
    isButtonUp(buttonName) {
        const btnState = this.#getButtonState(buttonName)
        return btnState == 'up' || btnState == 'released'
    }

    /** @param {GamepadButtonName} buttonName */
    isButtonDown(buttonName) {
        const btnState = this.#getButtonState(buttonName)
        return btnState == 'down' || btnState == 'pressed'
    }

    /** @param {GamepadAxes} stickAndDirection      */
    getAxes(stickAndDirection) {
        return this.#gamepadState.axes[this.#axes[stickAndDirection]];
    }


    // todo i'm here
    /**  @param {GpEventPayload} event */
    on(event){
        this.#callbacks.push(new GpEvent(event))
    }

    // ------MAPPING-------------

    /** @param {{buttons: {[key in GamepadButtonName]: number}, axes: {[key in Gamepadaxes]: number}}} param0 */
    remap({ buttons, axes }) {
        this.#buttons = { ...this.#buttons, ...buttons }
        this.#axes = { ...this.#axes, ...axes }
    }

    getMapping() {
        return { buttons: this.#buttons, axes: this.#axes }
    }



}

// const gp = new GamepadController();
// gp.on({button:'faceNorth',is:'down'})
// gp.buttonIsPressed('dPadDown')
// gp.getaxes('leftStickX')
// gp.remap({
//     axes: { leftStickY: 20, rightStickY: 30 },
//     buttons: { menu: 700, select: 800 }
// })
// console.log(gp.buttonIsPressed('menu'))
// console.log(gp.buttonIsPressed('start'))
// console.log(gp.buttonIsPressed('select'))
// console.log(gp.getaxes('leftStickY'))
// console.log(gp.getaxes('leftStickX'))
// console.log(gp.getaxes('rightStickY'))