import { View, ViewProps } from "react-native";
import React from "react";
import { TranslateOptions } from "i18n-js";
import { TxKeyPath } from "@/i18n";
import { cn } from "@/utils/tw";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";

interface ManageAssetHeadingProps extends ViewProps {
  tx?: TxKeyPath;
  txOptions?: TranslateOptions;
  text?: string;
}

const ManageAssetHeading = (props: ManageAssetHeadingProps) => {
  const { tx, txOptions, text, ...rest } = props;

  return (
    <View className="flex-1 mx-6">
      <View className={cn("flex-row items-center justify-center")} {...rest}>
        <View className="flex flex-row items-center gap-0.5 mr-4">
          <Icon
            icon="box"
            variant="feather"
            className=" text-secondary/80 dark:text-secondary-400/70 self-end mb-1"
            size={22}
          />
          <Icon
            icon="truck"
            variant="feather"
            className=" text-secondary/90 dark:text-secondary-400/80"
            size={40}
          />
        </View>

        <Text
          className="text-center text-xs flex-1"
          variant="muted"
          txOptions={txOptions}
          text={text}
          tx={tx}
        />
      </View>
    </View>
  );
};

export default ManageAssetHeading;
