import RootNavigator from "@/components/navigation/RootNavigator";
import StorageProvider from "@/storage/StorageProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts(fontsToLoad);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StorageProvider>
        {/* For displaying native toast messages */}
        <RootSiblingParent>
          <GestureHandlerRootView className="h-full w-full flex-1">
            <RootNavigator />
          </GestureHandlerRootView>
        </RootSiblingParent>
      </StorageProvider>
    </ThemeProvider>
  );
}

const fontsToLoad = {
  poppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
  poppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
  poppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
  poppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  poppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
  poppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  poppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  poppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
  poppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
};
