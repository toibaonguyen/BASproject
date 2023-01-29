import {configureStore,applyMiddleware,combineReducers} from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import {ReducerUserInfo,ReducerLogicFrontEnd,ReducerListofProducts,ReducerListofSolvingProducts,ReducerDM,ReducerUserRole} from './reducers'


const RootReducer = combineReducers({
    ReducerUserInfo,
    ReducerLogicFrontEnd,
    ReducerListofProducts,
    ReducerListofSolvingProducts,
    ReducerDM,
    ReducerUserRole
})

export default Store=configureStore({
    reducer: RootReducer,
    applyMiddleware: thunk
})