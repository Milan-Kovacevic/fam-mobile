import { SafeScreen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import translate from "@/i18n";
import { TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeScreen variant="auto" className="px-2.5 py-4">
      <Text variant="subheading">
        Test translation: {translate("welcomeScreen.letsGo")}
      </Text>
    </SafeScreen>
  );
}
