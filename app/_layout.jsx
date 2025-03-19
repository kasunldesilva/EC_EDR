import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; 
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "CustomFont": require("../assets/fonts/myfont.ttf"), // Example
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}> 
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(cr)" options={{ headerShown: false }} />
      </Stack>
    </I18nextProvider>
  );
}
