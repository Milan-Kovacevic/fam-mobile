import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { palette } from "@/theme/colors";
import { useTranslation } from "react-i18next";

const ManageNavigator = () => {
  const scheme = useColorScheme();
  const { t } = useTranslation();

  const screens = [
    {
      name: "create/asset",
      headerShown: true,
      title: t("assets.createTitle"),
    },
    {
      name: "edit/asset",
      headerShown: true,
      title: t("assets.editTitle"),
    },
    {
      name: "details/asset",
      headerShown: false,
      title: "",
    },
    {
      name: "create/location",
      headerShown: true,
      title: t("locations.createTitle"),
    },
    {
      name: "edit/location",
      headerShown: true,
      title: t("locations.editTitle"),
    },
    {
      name: "create/employee",
      headerShown: true,
      title: t("employees.createTitle"),
    },
    {
      name: "edit/employee",
      headerShown: true,
      title: t("employees.editTitle"),
    },
    {
      name: "create/asset-list-item",
      headerShown: true,
      title: t("registrar.createTitle"),
    },
    {
      name: "edit/asset-list-item",
      headerShown: true,
      title: t("registrar.editTitle"),
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
const $darkThemeHeaderStyle = {
  backgroundColor: palette.primary950,
};
const $lightThemeHeaderStyle = {
  backgroundColor: palette.primary50,
};
