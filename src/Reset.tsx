import React from "react";
import "./reset.css"
export type ResetType = {
    resetFunction: () => void
    data:number
}

export const Reset = (props:ResetType) => {
    return <button
        className={"buttonStyleReset"}
        disabled={props.data===0} onClick={() => props.resetFunction()}>Reset</button>

}