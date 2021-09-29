import React, {ChangeEvent, useEffect} from 'react';
import './App.css';
import "./buttons.css"
import "./input.css"
import "./tablo.css"

import {Universal} from "./Universal";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {
    SetStartValueAC, GetValueTC,
    IncValueAc, SetMAxValueTC,
    SetMinValueTC,
    StatusErrorAC, SetMaxValueAC, ResetValueAC
} from "./store/counter-reducer";


function App() {


    useEffect(() => {
        dispatch(GetValueTC())
    }, [])

    let data = useSelector<rootReducerType, number>(state => state.data.value)
    let startValue = useSelector<rootReducerType, number>(state => state.data.startValue)
    let maxValue = useSelector<rootReducerType, number>(state => state.data.maxValue)
    let error = useSelector<rootReducerType, boolean>(state => state.data.error)
    let dispatch = useDispatch()


    function reset() {
        dispatch(GetValueTC())
        dispatch(ResetValueAC(startValue))
    }

    function Inc() {
        dispatch(IncValueAc())
    }


    function ChangeMaxValue(e: ChangeEvent<HTMLInputElement>) {
        let maxvalue = +e.currentTarget.value;
        (maxvalue <= startValue && maxvalue <= 0 && maxvalue === startValue) ? dispatch(StatusErrorAC(true)) : dispatch(StatusErrorAC(false))
        dispatch(SetMaxValueAC(maxvalue))
    }

    function ChangeStartValue(e: ChangeEvent<HTMLInputElement>) {
        let minvalue = +e.currentTarget.value;
        (minvalue < maxValue && minvalue >= 0 && minvalue !== maxValue) ? dispatch(StatusErrorAC(false)) : dispatch(StatusErrorAC(true))
        dispatch(SetStartValueAC(minvalue))

    }

    function setLocalStorage() {
        dispatch(SetMinValueTC(startValue))
        dispatch(SetMAxValueTC(maxValue))
        dispatch(ResetValueAC(startValue))

    }


    return (
        <div className={"wrap"}>
            <div className={"App"}>
                <div className={"storageScreen"}>
                    <span className={"maxMin"}>max value:</span>
                    <input
                        className={startValue === maxValue || maxValue < 0 || maxValue < startValue ? "InputError" : "inputMaxMin"}
                        type="number"
                        value={maxValue}
                        onChange={ChangeMaxValue}
                    />

                    <span className={"maxMin"}>start value:</span>
                    <input
                        className={startValue === maxValue || startValue < 0 || maxValue < startValue ? "InputError" : "inputMaxMin"}
                        type="number"
                        value={startValue}
                        onChange={ChangeStartValue}
                    />
                </div>
                <div className={"SetStyles"}>
                    <Universal
                        callback={setLocalStorage}
                        data={data}
                        title={"set"}
                        minValue={startValue}
                        error={error}
                    />
                </div>
            </div>
            <div className="App">
                <div className={data === maxValue || data > maxValue ? "redNumber" : "number"}>
                    {startValue > maxValue || startValue === maxValue || startValue < 0 || maxValue < 0 || maxValue < startValue ?
                        <div className={"errorStl"}>Incorrect Data</div> : data}
                </div>

                <div className={"IncResStyles"}>
                    <Universal
                        callback={() => Inc()}
                        data={data}
                        title={"Inc"}
                        maxValue={maxValue}
                    />
                    <Universal
                        callback={() => reset()}
                        data={data}
                        title={"Res"}
                        minValue={startValue}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
