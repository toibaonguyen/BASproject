/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import {Provider} from 'react-redux'
import store from "./src/redux/store"
import TradingProductScreen from './src/screens/TradingProductScreen'
import ProductScreen from './src/screens/ProductScreen/ProductScreen'

const RootApp=()=>{
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}
/*
const RootApp=()=>{
    return(
        <Provider store={store}>
           <ProductScreen 
           images={["https://www.linkpicture.com/q/useravatar.jpg","https://www.linkpicture.com/q/useravatar.jpg"]}
           productname={"blaCK"}
           options={["wowy","kane"]}
           />
        </Provider>
    )
}*/
AppRegistry.registerComponent(appName, () => RootApp);
