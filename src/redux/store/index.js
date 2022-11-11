import {configureStore,applyMiddleware,combineReducers} from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import { ReducerUserInfo,ReducerLogicFrontEnd } from './reducers'


const RootReducer = combineReducers({ReducerUserInfo,ReducerLogicFrontEnd})

export default Store=configureStore({reducer: RootReducer,
    applyMiddleware: thunk})