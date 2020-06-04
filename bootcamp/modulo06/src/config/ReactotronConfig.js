import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect(); // usar o { host: ip} no config quando for usar usb
  console.tron = tron;

  tron.clear();
}
