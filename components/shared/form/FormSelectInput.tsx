import { TextInput, TouchableOpacity, View, ViewProps } from "react-native";
import React from "react";
import { Text } from "@/components/ui/Text";
import { Controller } from "react-hook-form";
import { palette } from "@/theme/colors";
import { cn } from "@/utils/tw";

interface FormSelectInputProps extends ViewProps {
  title: string;
  placeholder?: string;
  name: string;
  control: any;
  extractValue?: (value: any) => string;
  onPressed?: () => void;
  disabled?: boolean;
}

const FormSelectInput = (props: FormSelectInputProps) => {
  const {
    title,
    name,
    placeholder,
    control,
    extractValue,
    onPressed,
    disabled,
    ...rest
  } = props;

  return (
    <View className={cn(`space-y-0.5`, disabled && "opacity-50")} {...rest}>
      <Text
        variant="formLabel"
        className="ml-2 text-neutral-700 dark:text-neutral-300"
      >
        {title}
      </Text>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        onPress={!disabled ? onPressed : undefined}
      >
        <Controller
          control={control}
          name={name}
          disabled={disabled}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <View className="border-2 border-primary-50 dark:border-primary-950 w-full px-4 h-12 justify-center bg-primary-100/60 dark:bg-primary-900/60 rounded-2xl">
                <TextInput
                  readOnly={true}
                  className="flex-1 font-pregular text-base text-black dark:text-white"
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
      </TouchableOpacity>
    </View>
  );
};

export default FormSelectInput;
