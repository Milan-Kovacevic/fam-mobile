import {
  View,
  Switch as RNSwitch,
  ViewProps,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { palette } from "@/theme/colors";

interface SwitchProps extends ViewProps {
  enabled: boolean;
  onChange: () => void;
}

const Switch = (props: SwitchProps) => {
  const { enabled, onChange, ...rest } = props;
  const scheme = useColorScheme();

  return (
    <View className="self-start" {...rest}>
      <RNSwitch
        trackColor={{
          false: scheme == "dark" ? palette.gray700 : palette.gray300,
          true: scheme == "dark" ? palette.secondary300 : palette.secondary400,
        }}
        thumbColor={
          enabled
            ? scheme == "dark"
              ? palette.secondary500
              : palette.secondary600
            : scheme == "dark"
            ? palette.gray500
            : palette.gray400
        }
        onValueChange={onChange}
        value={enabled}
      />
    </View>
  );
};

export default Switch;
