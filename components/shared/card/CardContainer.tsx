import { cn } from "@/utils/tw";
import { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";

type CardContainerProps = {
  selectable: boolean;
  onPress?: () => void;
  children: ReactNode;
};
const CardContainer = ({
  selectable,
  children,
  onPress,
}: CardContainerProps) => {
  return selectable ? (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={cn(
        "flex-1 mb-1.5 p-2 px-4 rounded-xl border-[1.5px] bg-neutral-50 dark:bg-neutral-950 flex-row",
        "border-neutral-400/30 dark:border-neutral-400/30"
      )}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <View
      className={cn(
        "flex-1 mb-1.5 p-2 px-4 rounded-xl border-[1.5px] bg-neutral-50 dark:bg-neutral-950 flex-row",
        "border-neutral-400/30 dark:border-neutral-400/30"
      )}
    >
      {children}
    </View>
  );
};

export default CardContainer;
