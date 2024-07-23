import { useColorScheme, View } from "react-native";
import { Icon, IconVariant } from "../../ui/Icon";
import { cn } from "@/utils/tw";
import { Text } from "../../ui/Text";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export type DashboardCardProps = {
  variant: "primary" | "secondary";
  icon: string;
  iconVariant: IconVariant;
  total: number;
  name: string;
  value?: number;
  href: string;
};

const DashboardCard = (props: DashboardCardProps) => {
  const { variant, icon, iconVariant, total, name, value, href } = props;
  const scheme = useColorScheme();

  function handleCardPressed() {
    router.push(href);
  }

  return (
    <View className="flex items-stretch self-stretch basis-1/2">
      <TouchableOpacity
        onPress={handleCardPressed}
        activeOpacity={0.7}
        className="flex flex-row w-full items-stretch flex-1 p-1.5"
      >
        <View
          className={cn(
            "rounded-lg pt-3.5 pb-3 px-5 items-stretch flex-1",
            variant == "primary" && "bg-primary-400/70 dark:bg-primary/90",
            variant == "secondary" && "bg-secondary-400/70 dark:bg-secondary/90"
          )}
        >
          <Icon
            icon={icon}
            variant={iconVariant}
            className={cn(
              "text-4xl text-gray-800 dark:text-gray-300",
              variant == "secondary" && "text-neutral-800 dark:text-neutral-200"
            )}
          />
          <View className="flex-1 mt-3 ml-0.5">
            <Text
              className={cn(
                "self-start text-xl text-neutral-900 dark:text-neutral-100 font-psemibold"
              )}
            >
              {total}
            </Text>
            <Text
              className={cn(
                "self-start text-lg text-neutral-800 dark:text-neutral-300 -mt-1 font-pregular"
              )}
            >
              {name}
            </Text>
          </View>

          <View className="flex-row gap-0 self-end mt-1 h-6">
            {value && (
              <>
                <Icon
                  icon="dollar-sign"
                  variant="feather"
                  className="text-sm text-neutral-900 dark:text-neutral-200 pt-[2px]"
                />

                <Text className="self-end text-sm text-neutral-900 dark:text-neutral-200 font-pbold">
                  {value}
                </Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardCard;
