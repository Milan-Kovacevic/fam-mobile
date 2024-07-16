import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
  View,
  ViewProps,
} from "react-native";
import React, { useState } from "react";
import { cn } from "@/utils/tw";
import { Text } from "./Text";
import { palette } from "@/theme/colors";

interface FormFieldProps extends ViewProps {
  title: string;
  text: string;
  error?: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  handleSubmitted?: () => void;
  show?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
}

const FormField = (props: FormFieldProps) => {
  const {
    title,
    text,
    error,
    placeholder,
    handleChangeText,
    handleSubmitted,
    show,
    keyboardType,
    returnKeyType,
    ...rest
  } = props;
  const [showText, setshowText] = useState(show ?? true);

  return (
    <View className={`space-y-0.5`} {...rest}>
      <Text
        variant="formLabel"
        className="ml-2 text-neutral-800 dark:text-neutral-200"
      >
        {title}
      </Text>
      <View className="border-2 border-primary-50 dark:border-primary-950 w-full px-4 h-12 justify-center bg-primary-100/80 dark:bg-primary-900/80 rounded-2xl focus:border-primary focus:dark:border-primary-400">
        <TextInput
          className="flex-1 font-pregular text-base text-black dark:text-white"
          value={text}
          style={{ fontSize: 14 }}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor={palette.neutral400}
          secureTextEntry={!showText}
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
};

export default FormField;
