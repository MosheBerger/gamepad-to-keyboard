import { GamepadController } from "./Gamepad.js";

/**
 * @type {GamepadController | null}
 */
let gamepad
let interval

export function gamepadLoop(callback) {

    window.addEventListener('gamepadconnected', (e) => {
        gamepad = new GamepadController(1)
        // gamepad.remap({axes:{rightStickY:5},buttons:{select:8,start:7}})

        gamepad.remap({buttons:{select:8,start:7}})
        
        console.log('gamepad connected');
        console.log(gamepad)

        interval = setInterval(loop, 1000 / 60)
    })
    
    
    window.addEventListener('gamepaddisconnected', (e) => {
        gamepad = null
        
        console.log('gamepad disconnected');
        
        clearInterval(interval)
    })
    
    
    function loop() {
        callback(gamepad)
        gamepad.update()
        // console.count('loop');
    }
}

