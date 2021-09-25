

import {applyMiddleware, combineReducers, createStore} from "redux";
import {CounterReducer} from "./counter-reducer";
import thunk from "redux-thunk";



let rootReducer=combineReducers({
    data:CounterReducer,

})
export type rootReducerType=ReturnType<typeof rootReducer>
export let store=createStore(rootReducer,applyMiddleware(thunk))


