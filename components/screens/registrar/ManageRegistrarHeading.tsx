import { View, ViewProps } from "react-native";
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { TranslateOptions } from "i18n-js";
import { TxKeyPath } from "@/i18n";
import { cn } from "@/utils/tw";

interface ManageRegistrarHeadingProps extends ViewProps {
  tx?: TxKeyPath;
  txOptions?: TranslateOptions;
  text?: string;
}

const ManageRegistrarHeading = (props: ManageRegistrarHeadingProps) => {
  const { tx, txOptions, text, ...rest } = props;

  return (
    <View className={cn("flex-col mx-4 items-center justify-center")} {...rest}>
      <Icon
        icon="book"
        variant="antdesign"
        className=" text-secondary/90 dark:text-secondary-400/80"
        size={54}
      />
      <Text
        className="mt-1.5 text-center"
        variant="muted"
        txOptions={txOptions}
        text={text}
        tx={tx}
      />
    </View>
  );
};

export default ManageRegistrarHeading;
