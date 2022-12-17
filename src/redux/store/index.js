import {configureStore,applyMiddleware,combineReducers} from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import { ReducerUserInfo,ReducerLogicFrontEnd,ReducerListofProducts } from './reducers'


const RootReducer = combineReducers({ReducerUserInfo,ReducerLogicFrontEnd,ReducerListofProducts})

export default Store=configureStore({
    reducer: RootReducer,
    applyMiddleware: thunk
})