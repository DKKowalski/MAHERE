import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { MathProvider } from "./src/context/MathContext";
import CameraScreen from "./src/screens/CameraScreen";
import UploadScreen from "./src/screens/UploadScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ResultScreen from "./src/screens/ResultScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Upload: UploadScreen,
    Camera: CameraScreen,
    Result: ResultScreen,
  },
  { initialRouteName: "Home", defaultNavigationOptions: { title: "MAHERE" } }
);

const App = createAppContainer(navigator);
export default () => {
  return (
    <MathProvider>
      <App />
    </MathProvider>
  );
};
