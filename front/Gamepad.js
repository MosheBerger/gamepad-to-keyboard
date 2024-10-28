
/**
 * @typedef {'faceNorth' | 'faceSouth' | 'faceEast' | 'faceWest'  | 'dPadUp' | 'dPadDown' | 'dPadLeft' | 'dPadRight' | 'shoulderL' | 'shoulderR' | 'triggerL' | 'triggerR' | 'stickL' | 'stickR' | 'start' | 'select' | 'menu'} GamepadButtonName
 * @typedef {'leftStickX' | 'leftStickY' | 'rightStickX' | 'rightStickY'} Gamepadaxes
*/


export class GamepadController {

    #gamepadIndex
    #gamepadObj

    constructor(playerNumber = 1) {
        this.#gamepadIndex = playerNumber - 1;

        this.update();
        console.log('gamepadObj', this.#gamepadObj);
    }

    update(){
        this.#gamepadObj = navigator.getGamepads()[this.#gamepadIndex];
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

    AXES_DEAD_ZONE = 0.2
    // AXES_MAX = 1
    AXES_MIDDLE = 0.6

    /**
     * @param {GamepadButtonName} buttonName 
     * @returns boolean
     */
    buttonIsPressed(buttonName) {
        // return this.#buttons[buttonName]
        return this.#gamepadObj.buttons[this.#buttons[buttonName]].pressed;
    }

    /**
     * @param {Gamepadaxes} stickAndDirection 
     * @returns number
     */
    getAxes(stickAndDirection) {
        return this.#gamepadObj.axes[this.#axes[stickAndDirection]];
    }

    /**
     * 
     * @param {{buttons: {[key in GamepadButtonName]: number}, axes: {[key in Gamepadaxes]: number}}} param0 
     */
    remap({ buttons, axes }) {
        this.#buttons = { ...this.#buttons, ...buttons }
        this.#axes = { ...this.#axes, ...axes }
    }

    getMapping() {
        return { buttons: this.#buttons, axes: this.#axes }
    }



}

// const gp = new GamepadController();
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