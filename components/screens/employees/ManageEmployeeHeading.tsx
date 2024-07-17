import { View } from "react-native";
import React from "react";
import { TxKeyPath } from "@/i18n";
import { TranslateOptions } from "i18n-js";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";

type ManageEmployeeHeadingProps = {
  tx?: TxKeyPath;
  txOptions?: TranslateOptions;
  text?: string;
};

const ManageEmployeeHeading = (props: ManageEmployeeHeadingProps) => {
  const { tx, txOptions, text } = props;

  return (
    <View className="flex-col mx-4 mb-6 items-center justify-center">
      <Icon
        icon="user-plus"
        variant="fontawesome"
        className=" text-secondary/90 dark:text-secondary-400/80"
        size={54}
      />
      <Text
        className="mt-3 text-center"
        variant="muted"
        txOptions={txOptions}
        text={text}
        tx={tx}
      />
    </View>
  );
};

export default ManageEmployeeHeading;
