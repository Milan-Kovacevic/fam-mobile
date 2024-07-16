import { View } from "react-native";
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { TranslateOptions } from "i18n-js";
import { TxKeyPath } from "@/i18n";

type ManageLocationHeadingProps = {
  tx?: TxKeyPath;
  txOptions?: TranslateOptions;
  text?: string;
};

const ManageLocationHeading = (props: ManageLocationHeadingProps) => {
  const { tx, txOptions, text } = props;

  return (
    <View className="flex-col mx-4 mb-6 items-center justify-center">
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
