import { View, Text, ViewProps } from "react-native";
import React from "react";

interface SeparatorProps extends ViewProps {}

const Separator = ({ ...rest }: SeparatorProps) => {
  return (
    <View
      className="h-px my-2.5 bg-neutral-400/30 dark:bg-neutral-700"
      {...rest}
    />
  );
};

export default Separator;
