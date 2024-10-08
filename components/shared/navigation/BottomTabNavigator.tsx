import { Tabs } from "expo-router";
import React from "react";
import { TabIcon } from "./TabIcon";
import { useColorScheme, ViewStyle } from "react-native";
import { palette } from "@/theme/colors";
import { useTranslation } from "react-i18next";

const BottomTabNavigator = () => {
  const { t } = useTranslation();
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
              name={t("navigation.assets")}
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
              name={t("navigation.locations")}
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
              name={t("navigation.registrar")}
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
              name={t("navigation.employees")}
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
              name={t("navigation.settings")}
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
