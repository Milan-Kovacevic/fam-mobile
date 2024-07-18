import { SafeScreen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import translate from "@/i18n";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeScreen variant="auto" className="px-2.5 py-4">
      <Text variant="subheading">
        Test translation: {translate("welcomeScreen.letsGo")}
      </Text>
      <Link href="/create/asset" className="text-black dark:text-white">
        Go to create
      </Link>
    </SafeScreen>
  );
}
