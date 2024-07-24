import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { palette } from "@/theme/colors";

const ManageNavigator = () => {
  const scheme = useColorScheme();

  const screens = [
    {
      name: "create/location",
      headerShown: true,
      title: "Create Location",
    },
    {
      name: "edit/location",
      headerShown: true,
      title: "Edit Location",
    },
    {
      name: "create/employee",
      headerShown: true,
      title: "Add Employee",
    },
    {
      name: "edit/employee",
      headerShown: true,
      title: "Update Employee",
    },
    {
      name: "create/asset",
      headerShown: true,
      title: "Create Asset",
    },
    {
      name: "edit/asset",
      headerShown: true,
      title: "Edit Asset",
    },
    {
      name: "details/asset",
      headerShown: false,
      title: "",
    },
    {
      name: "create/asset-list-item",
      headerShown: true,
      title: "Add Inventory Item",
    },
  ];

  return (
    <>
      <Stack>
        {screens.map((item, index) => {
          return (
            <Stack.Screen
              key={`screen-${index}`}
              name={item.name}
              options={{
                headerShown: item.headerShown,
                title: item.title,
                headerStyle: {
                  ...(scheme == "dark"
                    ? $darkThemeHeaderStyle
                    : $lightThemeHeaderStyle),
                },
                headerTitleStyle: $headerTitleStyle,
              }}
            />
          );
        })}
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
