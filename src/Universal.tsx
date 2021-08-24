import React from "react";
import "./buttons.css"

export type UniversalType={
    callback:()=>void
    data:number
    title:string
    setdata?:(number:number)=>void
    error?:boolean
    minValue?:number
    maxValue?:number

}

export const Universal=(props:UniversalType)=>{
    const UniversalCallback=()=>{props.callback();props.setdata && props.setdata((props.minValue||0))}

    return(
        <button className={"buttonsStyle"}
                disabled={props.data===props.maxValue  || props.error|| (props.minValue || 0)<0 || props.maxValue===props.minValue}
                onClick= {UniversalCallback} >{props.title}</button>
    )
}