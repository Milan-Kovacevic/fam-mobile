import { View, ViewProps } from "react-native";
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { TxKeyPath } from "@/i18n";
import { cn } from "@/utils/tw";

interface ManageLocationHeadingProps extends ViewProps {
  tx?: TxKeyPath;
  text?: string;
}

const ManageLocationHeading = (props: ManageLocationHeadingProps) => {
  const { tx, text, ...rest } = props;

  return (
    <View className={cn("flex-col mx-4 items-center justify-center")} {...rest}>
      <Icon
        icon="map"
        variant="fontisto"
        className=" text-secondary/90 dark:text-secondary-400/80"
        size={54}
      />
      <Text className="mt-3 text-center" variant="muted" text={text} tx={tx} />
    </View>
  );
};

export default ManageLocationHeading;
