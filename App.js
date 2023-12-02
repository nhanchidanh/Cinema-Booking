import { NativeBaseProvider } from "native-base";
import { LogBox, StatusBar, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import Index from "./src/pages/Index";
import Provider from "./src/store/Provider";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider>
        <View style={styles.container}>
          <StatusBar></StatusBar>
          <Index />
        </View>
      </Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
