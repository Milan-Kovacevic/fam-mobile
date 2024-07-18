import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { palette } from "@/theme/colors";

const ManageNavigator = () => {
  const scheme = useColorScheme();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="create/location"
          options={{
            headerShown: true,
            title: "Create Location",
            headerStyle: {
              ...(scheme == "dark"
                ? $darkThemeHeaderStyle
                : $lightThemeHeaderStyle),
            },
            headerTitleStyle: $headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="edit/location"
          options={{
            headerShown: true,

            title: "Edit Location",
            headerStyle: {
              ...(scheme == "dark"
                ? $darkThemeHeaderStyle
                : $lightThemeHeaderStyle),
            },
            headerTitleStyle: $headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="create/employee"
          options={{
            headerShown: true,
            title: "Create Employee",
            headerStyle: {
              ...(scheme == "dark"
                ? $darkThemeHeaderStyle
                : $lightThemeHeaderStyle),
            },
            headerTitleStyle: $headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="edit/employee"
          options={{
            headerShown: true,
            title: "Update Employee",
            headerStyle: {
              ...(scheme == "dark"
                ? $darkThemeHeaderStyle
                : $lightThemeHeaderStyle),
            },
            headerTitleStyle: $headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="create/asset"
          options={{
            headerShown: true,
            title: "Create Asset",
            headerStyle: {
              ...(scheme == "dark"
                ? $darkThemeHeaderStyle
                : $lightThemeHeaderStyle),
            },
            headerTitleStyle: $headerTitleStyle,
          }}
        />
      </Stack>
    </>
  );
};

export default ManageNavigator;

const $headerTitleStyle = {
  fontFamily: "poppinsMedium",
};
const $headerStyle = {
  height: 20,
};
const $darkThemeHeaderStyle = {
  backgroundColor: palette.primary950,
};
const $lightThemeHeaderStyle = {
  backgroundColor: palette.primary50,
};
