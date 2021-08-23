import React from "react";
import "./button.css"

export type ButtonType={
    IncFunction:()=>void
    data:number
}

export const Button=(props:ButtonType)=>{
    return(
      <button className={"buttonStyle"}
              disabled={props.data===5} onClick= {()=>{props.IncFunction()}} >Increase</button>
    )
}