// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign, Entypo, Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StyleProp } from "react-native";
import { cn } from "@/utils/tw";

export type IconVariant =
  | "material"
  | "antdesign"
  | "ionicon"
  | "fontawesome"
  | "feather"
  | "fontisto"
  | "entypo";

export interface IconProps {
  icon: string;
  style?: StyleProp<any>;
  className?: string;
  variant?: IconVariant;
  size?: number;
}

const iconComponents = {
  material: MaterialIcons,
  antdesign: AntDesign,
  ionicon: Ionicons,
  fontawesome: FontAwesome,
  feather: Feather,
  fontisto: Fontisto,
  entypo: Entypo,
};

export function Icon(props: IconProps) {
  const { style, className, variant, icon, size, ...rest } = props;
  const $variant: typeof variant = variant ? variant : "ionicon";
  const IconComponent = iconComponents[$variant];

  return (
    <IconComponent
      size={size}
      name={icon as any}
      className={cn("text-black dark:text-white", className)}
      style={style}
      {...rest}
    />
  );
}
