import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import DashboardCard, { DashboardCardProps } from "./DashboardCard";

const LandingDashboard = () => {
  const Stats: DashboardCardProps[] = [
    {
      variant: "primary",
      icon: "box",
      iconVariant: "feather",
      name: "Inventory",
      total: 3027,
      value: 2000,
    },
    {
      variant: "secondary",
      icon: "location-outline",
      iconVariant: "ionicon",
      name: "Locations",
      total: 15,
    },
    {
      variant: "secondary",
      icon: "user",
      iconVariant: "feather",
      name: "Employees",
      total: 8,
    },
    {
      variant: "primary",
      icon: "list",
      iconVariant: "ionicon",
      name: "Registrar",
      total: 29,
      value: 18000,
    },
    {
      variant: "primary",
      icon: "list",
      iconVariant: "ionicon",
      name: "Registrar",
      total: 29,
      value: 18000,
    },
  ];

  return (
    <ScrollView
      className="w-full"
      contentContainerStyle={{
        width: "100%",
        height: "auto",
        flexDirection: "row",
        gap: 0,
        justifyContent: "center",
        alignItems: "stretch",
        flexWrap: "wrap",
      }}
    >
      <DashboardCard
        variant="primary"
        icon="box"
        iconVariant="feather"
        name="Inventory"
        total={3027}
        value={2000}
      />
      <DashboardCard
        variant="secondary"
        icon="location-outline"
        iconVariant="ionicon"
        name="Locations"
        total={15}
      />
      <DashboardCard
        variant="secondary"
        icon="user"
        iconVariant="feather"
        name="Employees"
        total={8}
      />
      <DashboardCard
        variant="primary"
        icon="list"
        iconVariant="ionicon"
        name="Registrar"
        total={29}
        value={18000}
      />
    </ScrollView>
    // <View>
    //   <FlatList
    //     data={Stats}
    //     renderItem={(props) => <DashboardCard {...props.item} />}
    //     keyExtractor={(item) => item.name}
    //     numColumns={2}
    //     contentContainerStyle={{
    //       width: "auto",
    //       height: 200,
    //       gap: 0,
    //       justifyContent: "center",
    //       alignItems: "stretch",
    //       borderWidth: 1,
    //       borderColor: "yellow",
    //     }}
    //   />
    // </View>
  );
};

export default LandingDashboard;
