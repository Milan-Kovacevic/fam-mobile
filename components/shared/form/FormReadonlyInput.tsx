import { TextInput, View, ViewProps } from "react-native";
import React from "react";
import { palette } from "@/theme/colors";
import { Text } from "../../ui/Text";
import { Controller } from "react-hook-form";

interface FormReadonlyInputProps extends ViewProps {
  title: string;
  placeholder?: string;
  name: string;
  control: any;
  extractValue?: (value: any) => string;
}

const FormReadonlyInput = (props: FormReadonlyInputProps) => {
  const { title, name, placeholder, control, extractValue, ...rest } = props;

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
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View className="border-2 border-primary-50 dark:border-primary-950 w-full px-4 h-12 justify-center bg-primary-100/80 dark:bg-primary-900/80 opacity-70 rounded-2xl">
              <TextInput
                readOnly={true}
                className="flex-1 font-pregular text-base text-gray-500 dark:text-gray-400"
                value={extractValue ? extractValue(value) : value}
                onChange={onChange}
                onBlur={onBlur}
                style={{ fontSize: 14 }}
                placeholder={placeholder}
                placeholderTextColor={palette.neutral400}
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

export default FormReadonlyInput;
