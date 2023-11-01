import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigations/app.navigation.js";
import TabNavigation from "./src/navigations/tab.navigation.js";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigation />
    </>
  );
}
