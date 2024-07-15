// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StyleProp, View } from "react-native";
import { cn } from "@/utils/tw";
import { Text } from "../ui/Text";

export interface TabIconProps {
  icon: string;
  name: string;
  style?: StyleProp<any>;
  className?: string;
  focused?: boolean;
  variant?: "material" | "antdesign" | "ionicon" | "fontawesome" | "feather";
}

const iconComponents = {
  material: MaterialIcons,
  antdesign: AntDesign,
  ionicon: Ionicons,
  fontawesome: FontAwesome,
  feather: Feather,
};

export function TabIcon(props: TabIconProps) {
  const { style, className, variant, name, icon, focused, ...rest } = props;
  const $variant: typeof variant = variant ? variant : "ionicon";
  const IconComponent = iconComponents[$variant];

  return (
    <View className="items-center">
      <IconComponent
        name={icon as any}
        size={24}
        className={cn(
          "-mb-[2px]",
          focused
            ? "text-primary dark:text-primary-400"
            : "text-gray-500/70 dark:text-gray-400/40"
        )}
        color="black"
        style={style}
        {...rest}
      />
      <Text
        className={cn(
          "text-[9px]",
          focused
            ? "text-primary dark:text-primary-400 font-psemibold"
            : "text-gray-500/70 dark:text-gray-400/40 font-pregular"
        )}
      >
        {name}
      </Text>
    </View>
  );
}
