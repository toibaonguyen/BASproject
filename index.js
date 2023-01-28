import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

const RootApp = () => {
  async function bootstrap() {
    await firestore()
      .settings({
        persistence: false,
      })
      .then(() => {
        console.log('1000');
      });
  }
  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <App />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootApp);
