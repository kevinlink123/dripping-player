import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./config/navigation/AppNavigator";
import { AudioProvider } from "./utils/context/AudioProvider";
import GlobalPlayerController from "./components/GlobalPlayerController";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
    return (
        <Provider store={store}>
            <AudioProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
                <GlobalPlayerController />
            </AudioProvider>
        </Provider>
    );
}
