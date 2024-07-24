import {
  Switch as RNSwitch,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";
import React from "react";
import { Text } from "../../ui/Text";
import { palette } from "@/theme/colors";
import { Controller } from "react-hook-form";

interface FormSwitchProps extends ViewProps {
  name: string;
  control: any;
  onChange?: (value: any) => void;
}

const FormSwitch = (props: FormSwitchProps) => {
  const { name, control, onChange: $onChange, ...rest } = props;
  const scheme = useColorScheme();

  return (
    <View className={`space-y-0.5`} {...rest}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <RNSwitch
              trackColor={{
                false: scheme == "dark" ? palette.gray700 : palette.gray300,
                true:
                  scheme == "dark"
                    ? palette.secondary300
                    : palette.secondary400,
              }}
              thumbColor={
                value
                  ? scheme == "dark"
                    ? palette.secondary500
                    : palette.secondary600
                  : scheme == "dark"
                  ? palette.gray500
                  : palette.gray400
              }
              onValueChange={(value) => {
                if ($onChange) {
                  $onChange(value);
                }
                onChange(value);
              }}
              value={value}
            />

            {error && (
              <Text
                variant="muted"
                className="ml-2 text-xs text-red-400 dark:text-red-400/80"
              >
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default FormSwitch;
