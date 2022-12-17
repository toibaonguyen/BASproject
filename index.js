/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import {Provider} from 'react-redux'
import store from "./src/redux/store"
import ProductsmanageScreen from './src/screens/ProductsmanageScreen'
import ProductConditionItem from './src/components/ProductConditionItem'
import { NavigationContainer } from '@react-navigation/native'


const RootApp=()=>{
    return(
        <Provider store={store}>
            <NavigationContainer>
              <App/>
            </NavigationContainer> 
        </Provider>
    )
}

                                                                                              
AppRegistry.registerComponent(appName, () => RootApp);
