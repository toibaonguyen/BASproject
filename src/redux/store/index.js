import {configureStore,applyMiddleware,combineReducers} from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import {ReducerUserInfo,ReducerLogicFrontEnd,ReducerListofProducts,ReducerListofSolvingProducts,ReducerDM} from './reducers'


const RootReducer = combineReducers({
    ReducerUserInfo,
    ReducerLogicFrontEnd,
    ReducerListofProducts,
    ReducerListofSolvingProducts,
    ReducerDM
})

export default Store=configureStore({
    reducer: RootReducer,
    applyMiddleware: thunk
})