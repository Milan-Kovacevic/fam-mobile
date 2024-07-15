import { SafeScreen } from "@/components/ui/Screen";
import { Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <SafeScreen variant="auto">
      <Text className="text-white text-3xl font-semibold">Explore...</Text>
    </SafeScreen>
  );
}
