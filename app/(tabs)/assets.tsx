import { SafeScreen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import translate from "@/i18n";
import { AssetDTO } from "@/storage/models/assets";
import { getAllAssets } from "@/storage/repositories/assets-repository";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [assets, setAssets] = useState<AssetDTO[]>([]);

  useEffect(() => {
    getAllAssets(db).then((result) => {
      setAssets(result);
    });
  }, []);

  return (
    <SafeScreen variant="scroll" className="px-2.5 py-4 flex-1">
      <Text variant="subheading">
        Test translation: {translate("welcomeScreen.letsGo")}
      </Text>
      <Link href="/create/asset" className="text-black dark:text-white">
        Go to create
      </Link>
      <View className="flex-1 gap-y-2 mt-2 mx-4">
        {assets.map((item, i) => {
          return (
            <View className="p-3 border border-red-50 rounded-xl">
              <Text>
                {item.id} - {item.name} - {item.dateCreated}
              </Text>
            </View>
          );
        })}
      </View>
    </SafeScreen>
  );
}
