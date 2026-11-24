import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ExpenseTracker from "./components/ExpenseTracker";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
        <StatusBar style="auto" />
        <ExpenseTracker />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

