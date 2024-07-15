import { StyleProp, View, ViewStyle } from "react-native";
import { Icon, IconVariant } from "./ui/Icon";
import { cn } from "@/utils/tw";
import { Text } from "./ui/Text";

export type DashboardCardProps = {
  variant: "primary" | "secondary";
  icon: string;
  iconVariant: IconVariant;
  total: number;
  name: string;
  value?: number;
  style?: StyleProp<ViewStyle>;
};

const DashboardCard = (props: DashboardCardProps) => {
  const { variant, icon, iconVariant, total, name, value, style } = props;
  return (
    <View className="items-stretch flex-1 basis-1/2 p-1.5">
      <View
        className={cn(
          "rounded-md pt-3.5 pb-3 px-5 items-stretch flex-1",
          variant == "primary" && "bg-primary-400/50 dark:bg-primary/50",
          variant == "secondary" && "bg-secondary-400/50 dark:bg-secondary/50"
        )}
      >
        <Icon
          icon={icon}
          variant={iconVariant}
          className={cn(
            "text-4xl text-neutral-950 dark:text-neutral-200",
            variant == "secondary" && "text-neutral-900 dark:text-neutral-50"
          )}
        />
        <View className="flex-1 mt-3 ml-0.5">
          <Text
            className={cn(
              "self-start text-xl text-neutral-900 dark:text-neutral-100 font-psemibold",
              variant == "secondary" &&
                "text-xl text-neutral-900 dark:text-neutral-50"
            )}
          >
            {total}
          </Text>
          <Text
            className={cn(
              "self-start text-lg text-neutral-800 dark:text-neutral-300 -mt-1 font-pregular",
              variant == "secondary" &&
                "text-lg text-neutral-700 dark:text-neutral-100"
            )}
          >
            {name}
          </Text>
        </View>
        {value && (
          <View className="flex-row gap-0 self-end mt-1">
            <Icon
              icon="dollar-sign"
              variant="feather"
              className="text-sm text-neutral-900 dark:text-neutral-200"
            />
            <Text className="self-end text-sm text-neutral-900 dark:text-neutral-200 font-pbold">
              {value}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default DashboardCard;
