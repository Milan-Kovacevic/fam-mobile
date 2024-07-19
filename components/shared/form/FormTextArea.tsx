import {
  View,
  ViewProps,
  TextInput,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from "react-native";
import React, { RefObject } from "react";
import { Text } from "../../ui/Text";
import { Controller } from "react-hook-form";
import { palette } from "@/theme/colors";

interface FormFieldProps extends ViewProps {
  title: string;
  name: string;
  placeholder?: string;
  control: any;
  ref?: RefObject<TextInput>;
}

const FormTextArea = (props: FormFieldProps) => {
  const { title, name, placeholder, control, ...rest } = props;

  return (
    <View className={`space-y-0.5`} {...rest}>
      <Text
        variant="formLabel"
        className="ml-2 text-neutral-800 dark:text-neutral-200"
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
            <View className="border-2 min-h-[75px] border-primary-50 dark:border-primary-950 w-full px-4 py-0 justify-start bg-primary-100/60 dark:bg-primary-900/80 rounded-2xl focus:border-primary focus:dark:border-primary-400">
              <TextInput
                multiline
                editable
                numberOfLines={2}
                maxLength={500}
                ref={ref}
                className="min-h-[75px] flex-1 h-full justify-start items-start font-pregular text-base text-black dark:text-white"
                placeholder={placeholder}
                value={value}
                style={{ fontSize: 14 }}
                placeholderTextColor={palette.neutral400}
                onChangeText={onChange}
                onBlur={onBlur}
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

export default FormTextArea;
