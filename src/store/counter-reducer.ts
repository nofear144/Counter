import {Dispatch} from "redux";

let initialState = {
    value: 0,
    startValue: 0,
    maxValue: 0,
    error: true

}
type InitialStateType = typeof initialState

export const CounterReducer = (data:InitialStateType = initialState, action: containerAcTypes):InitialStateType => {
    /* debugger*/
    switch (action.type) {
        case "RESET_VALUE":
            return {...data, value: action.value}
        case "INCREASE_VALUE":
            return {...data, value: data.value + 1}
        case "SET_START_VALUE":
            return {...data, startValue: action.value}
        case "SET_MAX_VALUE":
            return {...data, maxValue: action.value}
        case "STATUS_ERROR":
            return {...data, error: action.status}


        default :
            return data
    }

}

type IncreaseValueACType = {
    type: "INCREASE_VALUE"
}
type GetStartValueACType = ReturnType<typeof SetStartValueAC>
type GetMaxValueACType = ReturnType<typeof SetMaxValueAC>
type StatusErrorACType = ReturnType<typeof StatusErrorAC>
type ResetValueACType = ReturnType<typeof ResetValueAC>


export type containerAcTypes =
    IncreaseValueACType
    | GetStartValueACType
    | GetMaxValueACType
    | StatusErrorACType
    | ResetValueACType;


export let IncValueAc = () => {
    return {
        type: "INCREASE_VALUE",
    }
}
export const SetStartValueAC = (value: number) => {
    return {
        type: "SET_START_VALUE",
        value,
    } as const
}
export const SetMaxValueAC = (value: number) => {
    return {
        type: "SET_MAX_VALUE",
        value,
    } as const
}
export const ResetValueAC = (value: number) => {
    return {
        type: "RESET_VALUE",
        value,
    } as const
}
export const StatusErrorAC = (status: boolean) => {
    return {
        type: "STATUS_ERROR",
        status

    } as const
}


//THUNK
export const SetMinValueTC = (startValue: number) => (dispatch: Dispatch) => {
    localStorage.setItem("start value", JSON.stringify(startValue))
    dispatch(SetStartValueAC(startValue))


}
export const SetMAxValueTC = (maxValue: number) => (dispatch: Dispatch) => {
    localStorage.setItem("max value", JSON.stringify(maxValue))
    dispatch(SetMaxValueAC(maxValue))

}

export const GetValueTC = () => (dispatch: Dispatch) => {
    let startValue = localStorage.getItem('start value')
    if (startValue) {
        let startValueFromStorage = JSON.parse(startValue)
        dispatch(SetStartValueAC(startValueFromStorage))

    }

    let maxValue = localStorage.getItem('max value')
    if (maxValue) {
        let maxValueFromStorage = JSON.parse(maxValue)
        dispatch(SetMaxValueAC(maxValueFromStorage))
    }
}










