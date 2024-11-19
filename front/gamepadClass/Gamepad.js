/** @import { GpButtonName,RemapPayload, GpAxesName,ButtonState,GpEvent, GpEventCallback } from '../types.js' */

import { GpEventObj } from './gpEvent.js'



export class GamepadController {

    /**@type {number} */ #gamepadIndex

    /**@type {Gamepad} */ #gamepadState
    /**@type {Gamepad} */ #gamepadLastState

    /**@type {GpEventObj[]} */ gpEvents = []

    #loopInterval = null

    AXES_DEAD_ZONE = 0.2
    AXES_MIDDLE = 0.6


    constructor() {

        window.addEventListener('gamepadconnected', (e) => {
            this.#onDisconnect()
            this.#onConnect(e)
        })

        window.addEventListener('gamepaddisconnected', () =>
            this.#onDisconnect()
        )
    }


    #onConnect(e) {
        console.log('gamepad connected');

        this.#gamepadIndex = e.gamepad.index

        this.#loopInterval = setInterval(() => this.#loop(), 1000 / 60)
    }
    #onDisconnect() {
        if (!this.#loopInterval) { return }

        console.log('gamepad disconnected');

        clearInterval(this.#loopInterval)
        this.#gamepadIndex = null
        this.#loopInterval = null
    }



    //------📅 EVENTS---------------------

    /**
     *  @param {GpEvent} event
     *  @param {GpEventCallback} callback 
     *  @param {string} [description]
     */
    on(event, callback, description) {
        const newEvent = new GpEventObj(this, event, callback, description)
        this.gpEvents.push(newEvent)
        return newEvent.id
    }

    removeAllEvents() {
        this.gpEvents = []
    }

    removeEventsById(id) {
        this.gpEvents = this.gpEvents.filter(e => e.id !== id)
    }

    removeEventByDescription(description) {
        this.gpEvents = this.gpEvents.filter(e => e.description !== description)
    }


    #loop() {
        this.#updateButtonsState()

        this.gpEvents?.forEach(c => {
            c.checkAndRun()
        })
    }

    #updateButtonsState() {
        this.#gamepadLastState = this.#gamepadState
        this.#gamepadState = navigator.getGamepads()[this.#gamepadIndex];
    }

    //------🔴 MAP INDEXES 🎮---------------------

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




    // ------📍 MAPPING-------------

    /** @param {RemapPayload} param0 */
    remap({ buttons, axes }) {
        this.#buttons = { ...this.#buttons, ...buttons }
        this.#axes = { ...this.#axes, ...axes }
    }

    getMapping() {
        return { buttons: this.#buttons, axes: this.#axes }
    }



    //------🔘 BUTTONS AND AXES 🕹️---------------------

    /** @param {GpButtonName} buttonName * @returns {ButtonState} */
    #getButtonState(buttonName) {

        const btnIndex = this.#buttons[buttonName]
        const isPressedNow = this.#gamepadState.buttons[btnIndex].pressed
        const isPressedLastTime = this.#gamepadLastState.buttons[btnIndex].pressed

        if (isPressedNow && !isPressedLastTime) return 'pressed'
        if (!isPressedNow && isPressedLastTime) return 'released'
        if (isPressedNow) return 'down'
        if (!isPressedNow) return 'up'
    }

    /** @param {GpButtonName} buttonName */
    isButtonPressed(buttonName) {
        const btnState = this.#getButtonState(buttonName)
        return btnState == 'pressed'
    }

    /** @param {GpButtonName} buttonName */
    isButtonReleased(buttonName) {
        const btnState = this.#getButtonState(buttonName)
        return btnState == 'released'
    }

    /** @param {GpButtonName} buttonName */
    isButtonUp(buttonName) {
        const btnState = this.#getButtonState(buttonName)
        return btnState == 'up' || btnState == 'released'
    }

    /** @param {GpButtonName} buttonName */
    isButtonDown(buttonName) {
        const btnState = this.#getButtonState(buttonName)
        return btnState == 'down' || btnState == 'pressed'
    }

    /** @param {GpAxesName} stickAndDirection      */
    getAxes(stickAndDirection) {
        return this.#gamepadState.axes[this.#axes[stickAndDirection]];
    }




}

// const gp = new GamepadController();
// gp.on({ type: 'update' }, () => console.log('update'))
// gp.on({ type: 'update' }, () => console.log('update2'))
// gp.on(
//     { type: 'button', button: 'dPadDown', is: 'pressed' },
//     () => console.log(`type:'button', button:'dPadDown', is:'pressed'`)
// )
// gp.on({ type: 'axes', axes: 'leftStickX' }, () => console.log('stick'))
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