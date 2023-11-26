import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import Index from "./src/pages/Index";
import Provider from "./src/store/Provider";
import { NativeBaseProvider } from "native-base";
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <NativeBaseProvider>
      <Provider>
        <View style={styles.container}>
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
