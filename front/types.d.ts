
export type GamepadButtonName = 'faceNorth' | 'faceSouth' | 'faceEast' | 'faceWest'  | 'dPadUp' | 'dPadDown' | 'dPadLeft' | 'dPadRight' | 'shoulderL' | 'shoulderR' | 'triggerL' | 'triggerR' | 'stickL' | 'stickR' | 'start' | 'select' | 'menu'
export type GamepadAxes = 'leftStickX' | 'leftStickY' | 'rightStickX' | 'rightStickY'

export type ButtonState = 'down' | 'up' | 'pressed' | 'released'


type BtnEvent = {
    type: 'button',
    button: GamepadButtonName,
    is: ButtonState
}

type AxesEvent = {
    type: 'axes',
    axes: GamepadAxes
}

export type GpEventPayload =  BtnEvent | AxesEvent

