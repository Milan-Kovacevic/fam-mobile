import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
  View,
  ViewProps,
} from "react-native";
import React, { RefObject } from "react";
import { Text } from "../../ui/Text";
import { palette } from "@/theme/colors";
import { Controller } from "react-hook-form";

interface FormFieldProps extends ViewProps {
  title: string;
  name: string;
  placeholder?: string;
  control: any;
  type?: "text" | "number";
  ref?: RefObject<TextInput>;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitted?: () => void;
}

const FormInput = (props: FormFieldProps) => {
  const {
    title,
    name,
    placeholder,
    control,
    type,
    onSubmitted,
    keyboardType,
    returnKeyType,
    ...rest
  } = props;

  const $type = type ? type : "text";
  const $keyboardType: KeyboardTypeOptions = keyboardType
    ? keyboardType
    : $type === "number"
    ? "numeric"
    : "default";
  return (
    <View className={`space-y-0.5`} {...rest}>
      <Text
        variant="formLabel"
        className="ml-2 text-neutral-700 dark:text-neutral-300"
      >
        {title}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange, onBlur, ref },
          fieldState: { error },
        }) => (
          <>
            <View className="border-2 border-primary-50 dark:border-primary-950 w-full px-4 h-12 justify-center bg-primary-100/60 dark:bg-primary-900/80 rounded-2xl focus:border-primary focus:dark:border-primary-400">
              <TextInput
                ref={ref}
                className="flex-1 font-pregular text-base text-black dark:text-white"
                placeholder={placeholder}
                value={
                  $type == "text"
                    ? value
                    : isNaN(parseFloat(value))
                    ? value
                    : value.toString()
                }
                style={{ fontSize: 14 }}
                placeholderTextColor={palette.neutral400}
                onChangeText={(text) => {
                  if ($type == "text") onChange(text);
                  else if ($type == "number") {
                    const numericValue = text.replace(/[^0-9\.,-]/g, "");
                    onChange(numericValue);
                  }
                }}
                onBlur={onBlur}
                onSubmitEditing={onSubmitted}
                keyboardType={$keyboardType}
                returnKeyType={returnKeyType ?? "send"}
              />
            </View>

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

export default FormInput;
