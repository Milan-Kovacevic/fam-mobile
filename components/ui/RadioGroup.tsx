import {
  ColorSchemeName,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import {
  RadioButton,
  RadioButtonProps,
  RadioGroup as RNRadioGroup,
} from "react-native-radio-buttons-group";
import { palette } from "@/theme/colors";
import { Text } from "./Text";

type RadionOptionProps = {
  id: string;
  label: string;
  value: string;
};

type RadioGroupProps = {
  title: string;
  options: RadionOptionProps[];
  selectedId: string;
  onSelectionChange: (id: string) => void;
};

const RadioGroup = (props: RadioGroupProps) => {
  const { options, title, selectedId, onSelectionChange } = props;
  const scheme = useColorScheme();

  const radioButtons: RadioButtonProps[] = options.map((item) => ({
    ...item,
    ...$radioButtonOptions,
    color: scheme === "dark" ? palette.neutral400 : palette.neutral600,
    labelStyle: {
      color: scheme === "dark" ? palette.neutral200 : palette.neutral800,
      fontFamily: "poppinsRegular",
      paddingTop: 4,
      fontSize: 14,
      marginLeft: 8,
    },
  }));

  return (
    <View className="w-full justify-center">
      <Text className="font-pmedium mb-0.5 text-base">{title}</Text>
      <RNRadioGroup
        radioButtons={radioButtons}
        onPress={onSelectionChange}
        selectedId={selectedId}
        containerStyle={{
          alignSelf: "flex-start",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: 0,
        }}
      />
    </View>
  );
};

export default RadioGroup;

type CustomRadioButtonProps = Pick<RadioButtonProps, "size" | "containerStyle">;

const $radioButtonOptions: CustomRadioButtonProps = {
  size: 20,
  containerStyle: {
    marginVertical: 1,
    alignItems: "center",
  },
};
