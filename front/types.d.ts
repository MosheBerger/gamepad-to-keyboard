import { GamepadController } from "./Gamepad"

export type GpButtonName = 'faceNorth' | 'faceSouth' | 'faceEast' | 'faceWest'  | 'dPadUp' | 'dPadDown' | 'dPadLeft' | 'dPadRight' | 'shoulderL' | 'shoulderR' | 'triggerL' | 'triggerR' | 'stickL' | 'stickR' | 'start' | 'select' | 'menu'
export type GpAxesName = 'leftStickX' | 'leftStickY' | 'rightStickX' | 'rightStickY'

export type ButtonState = 'down' | 'up' | 'pressed' | 'released'


type BtnEvent = {
    type: 'button',
    button: GpButtonName,
    is: ButtonState
}

type AxesEvent = {
    type: 'axes',
    axes: GpAxesName
}

type UpdateEvent = {
    type: 'update'
}

export type GpEvent =  BtnEvent | AxesEvent | UpdateEvent


export type GpEventCallback = (gamepad: GamepadController) => void 

export type RemapPayload = {
    buttons?: Record<GpButtonName, number>,
    axes?: Record<GpAxesName, number>
}

export type AxisVec = {
    x: number,
    y: number,
}