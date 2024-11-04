/**
 * Condition for callback to run
 * @typedef {import("./Gamepad").GamepadButtonName} Button 
 * @typedef {""} State
* 
* @typedef {{if:if, is:is, to:to}} condition
*/


class GpCallback {

    /**
     * @type {Button}
     */
    button
    do

    /**
     * @param {Button} button
     * @param {function} action 
     */
    constructor(button, action) {
        this.button = button
        this.do = action
    }
}


export default GpCallback