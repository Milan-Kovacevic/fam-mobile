import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import DashboardCard, { DashboardCardProps } from "./DashboardCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { router } from "expo-router";

const LandingDashboard = () => {
  const Stats: DashboardCardProps[] = [
    {
      variant: "primary",
      icon: "inventory",
      iconVariant: "material",
      name: "Inventory",
      href: "/assets",
      total: 3027,
      value: 2000,
    },
    {
      variant: "secondary",
      icon: "location-outline",
      iconVariant: "ionicon",
      name: "Locations",

      href: "/locations",
      total: 15,
    },
    {
      variant: "secondary",
      icon: "user",
      iconVariant: "feather",
      name: "Employees",
      href: "/employees",
      total: 8,
    },
    {
      variant: "primary",
      icon: "list",
      iconVariant: "ionicon",
      name: "Registrar",
      href: "/assets",
      total: 29,
      value: 18000,
    },
  ];

  function handleGoToSettings() {
    router.push("/settings");
  }

  return (
    <View className="flex-1 pb-5">
      <View className="rounded-full absolute z-20 bottom-1/2 right-1/2 -translate-y-[22px] translate-x-[22px] bg-primary-50 dark:bg-primary-950">
        <Button
          className="rounded-full p-3 py-1.5 self-center bg-primary-50/70 dark:bg-primary-950/70"
          variant="ghost"
          onPressed={handleGoToSettings}
          LeftAccessory={() => (
            <Icon
              icon="gear"
              variant="fontawesome"
              className="text-2xl text-gray-500 dark:text-gray-400"
            />
          )}
        />
      </View>
      <FlatList
        data={Stats}
        renderItem={(props) => <DashboardCard {...props.item} />}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={{
          width: "auto",
          gap: 0,
          height: "auto",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      />
    </View>
  );
};

export default LandingDashboard;
