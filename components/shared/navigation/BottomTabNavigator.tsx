import { Tabs } from "expo-router";
import React from "react";
import { TabIcon } from "./TabIcon";
import { useColorScheme, ViewStyle } from "react-native";
import { palette } from "@/theme/colors";

const BottomTabNavigator = () => {
  const scheme = useColorScheme();

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          ...$navigationTabStyle,
          ...(scheme == "dark"
            ? $darkThemeBackgroundStyle
            : $lightThemeBackgroundStyle),
        },
      }}
    >
      <Tabs.Screen
        name="assets"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              variant="feather"
              icon={focused ? "layers" : "layers"}
              name="Assets"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              variant="feather"
              icon={focused ? "map-pin" : "map-pin"}
              name={"Locations"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="registrar"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              variant="entypo"
              icon={focused ? "list" : "list"}
              name={"Registrar"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="employees"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              variant="feather"
              icon={focused ? "user" : "user"}
              name={"Employees"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              variant="feather"
              icon={focused ? "settings" : "settings"}
              name={"Settings"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default BottomTabNavigator;

const $navigationTabStyle: ViewStyle = {
  height: 52,
  paddingTop: 8,
  paddingLeft: 10,
  paddingRight: 10,
  justifyContent: "flex-end",
  alignItems: "stretch",
  borderTopWidth: 0.5,
};
const $darkThemeBackgroundStyle: ViewStyle = {
  backgroundColor: palette.primary950,
  borderTopColor: palette.neutral800,
};
const $lightThemeBackgroundStyle: ViewStyle = {
  backgroundColor: palette.primary50,
  borderTopColor: palette.neutral200,
};
