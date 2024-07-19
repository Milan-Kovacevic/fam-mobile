import {
  $buttonTextVariantsClassName,
  $buttonVariantsClassName,
} from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { cn } from "@/utils/tw";
import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="p-3 items-center flex-1 mt-4">
        <Text className="font-psemibold text-xl">
          This screen doesn't exist.
        </Text>
        <Link
          className={cn(
            $buttonVariantsClassName["secondary"],
            "pt-1 pb-0.5 mt-1.5"
          )}
          href="/"
        >
          <Text className={cn($buttonTextVariantsClassName["secondary"])}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
