import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import DashboardCard, { DashboardCardProps } from "./DashboardCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { getDashboardOverviewStats } from "@/storage/services/stats-service";
import DashboardSkeleton from "./DashboardSkeleton";
import { delay } from "@/utils/util";

const LandingDashboard = () => {
  const db = useSQLiteContext();
  const [stats, setStats] = useState<DashboardCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    delay(1000).then(() => {
      getDashboardOverviewStats(db)
        .then((result) => {
          setStats(result);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

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
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <FlatList
          data={stats}
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
      )}
    </View>
  );
};

export default LandingDashboard;
