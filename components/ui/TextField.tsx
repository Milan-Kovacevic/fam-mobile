import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
  View,
  ViewProps,
} from "react-native";
import React, { RefObject, forwardRef } from "react";
import { Text } from "./Text";
import { palette } from "@/theme/colors";
import { cn } from "@/utils/tw";

interface FormFieldProps extends ViewProps {
  title: string;
  text: string;
  error?: string;
  placeholder?: string;
  readonly?: boolean;
  handleChangeText?: (text: string) => void;
  handleSubmitted?: () => void;
  ref?: RefObject<TextInput>;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
}

const TextField = forwardRef<TextInput, FormFieldProps>(
  (props: FormFieldProps, ref) => {
    const {
      title,
      text,
      error,
      placeholder,
      readonly,
      handleChangeText,
      handleSubmitted,
      keyboardType,
      returnKeyType,
      ...rest
    } = props;

    return (
      <View className={`space-y-0.5`} {...rest}>
        <Text
          variant="formLabel"
          className="ml-2 text-neutral-800 dark:text-neutral-200"
        >
          {title}
        </Text>
        <View
          className={cn(
            "border-2 w-full px-4 h-12 justify-center rounded-2xl ",
            !readonly
              ? "border-primary-50 dark:border-primary-950 bg-primary-100/80 dark:bg-primary-900/80 focus:border-primary focus:dark:border-primary-400"
              : "border-primary-50 dark:border-primary-950 bg-primary-100/60 dark:bg-primary-900/80"
          )}
        >
          <TextInput
            readOnly={readonly}
            ref={ref}
            className="flex-1 font-pregular text-base text-black dark:text-white"
            value={text}
            style={{ fontSize: 14 }}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            placeholderTextColor={palette.neutral400}
            keyboardType={keyboardType ?? "default"}
            returnKeyType={returnKeyType ?? "send"}
            onSubmitEditing={handleSubmitted}
          />
        </View>
        {error && (
          <Text
            variant="muted"
            className="ml-2 text-xs text-red-400 dark:text-red-400/80"
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

export { TextField };
