import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import StackNavigator from "./StackNavigator";
import { MovieContext } from "./Context";
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <>
      <MovieContext>
        <StripeProvider publishableKey="pk_test_51LjiHUSCzHeIrcRGFHXbn8FeqXeYOlbyMjAaN754mFyLsu2bfTW97PW6fZVkGLN19pzIAUD0kklTRXdVRJgBKWs8005eNGAJNL">
          <StackNavigator />
          <StatusBar style="auto" />
        </StripeProvider>
      </MovieContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 25,
  },
});
