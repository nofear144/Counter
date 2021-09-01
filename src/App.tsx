import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import "./buttons.css"
import "./input.css"
import "./tablo.css"

import {Universal} from "./Universal";


function App() {

    let [data, setData] = useState(0)

    let [startValue, setStartValue] = useState(0)

    let [maxValue, setMaxValue] = useState(0)

    let [error, setError] = useState(true)



    useEffect(() => {

        let startValue = localStorage.getItem('start value')
        if (startValue) {
            let startValueFromStorage = JSON.parse(startValue)
            setStartValue(startValueFromStorage)
            setData(startValueFromStorage)
        }
    }, [])
    useEffect(() => {
        let maxValue = localStorage.getItem('max value')

        if (maxValue) {
            let maxValueFromStorage = JSON.parse(maxValue)
            setMaxValue(maxValueFromStorage)
        }
    }, [])

    function reset() {
        let startValue = localStorage.getItem('start value')
        if (startValue) {
            let startValueFromStorage = JSON.parse(startValue)
            setData(startValueFromStorage)
        }

    }

    function Inc() {
        setData(data + 1)
    }


    function ChangeMaxValue(e: ChangeEvent<HTMLInputElement>) {
        let maxvalue = +e.currentTarget.value;
        (maxvalue <= startValue && maxvalue <= 0) ? setError(true) : setError(false)
        setMaxValue(maxvalue)
    }

    function ChangeStartValue(e: ChangeEvent<HTMLInputElement>) {
        let minvalue = +e.currentTarget.value;
        (minvalue < maxValue && minvalue >= 0) ? setError(false) : setError(true)
        setStartValue(minvalue)

    }

    function setLocalStorage() {
        localStorage.setItem("max value", JSON.stringify(maxValue))
        localStorage.setItem("start value", JSON.stringify(startValue))
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
                        setdata={setData}
                        error={error}
                    />
                </div>
            </div>
            <div className="App">
                <div className={data === maxValue ? "redNumber" : "number"}>
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
