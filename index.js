/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import {Provider} from 'react-redux'
import store from "./src/redux/store"
import { NavigationContainer } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import { useEffect } from 'react'



const RootApp=()=>{
    async function bootstrap() {
        await firestore().settings({
          persistence: false, // disable offline persistence
        }).then(()=>{
            console.log('1000')
        })
    }
    useEffect(()=>{
        bootstrap()
    },[])

    return(
        <Provider store={store}>
            <NavigationContainer>
              <App/>
            </NavigationContainer> 
        </Provider>
    )
}

                                                                                              
AppRegistry.registerComponent(appName, () => RootApp);
