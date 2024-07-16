import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";
import React, { useState } from "react";
import { palette } from "@/theme/colors";
import { Icon } from "./Icon";
import { cn } from "@/utils/tw";
import { NativeSearchBar } from "react-native-screens";

interface SearchInputProps extends ViewProps {
  text: string;
  placeholder?: string;
  onTextChange: (text: string) => void;
  onSearch: (text: string) => void;
  onClear: () => void;
}

const SearchInput = (props: SearchInputProps) => {
  const { text, placeholder, onSearch, onClear, onTextChange, ...rest } = props;
  const scheme = useColorScheme();
  const [active, setActive] = useState(false);

  return (
    <View
      className="border-2 flex-row items-stretch border-transparent w-full pl-3 pr-0 h-11 justify-center bg-gray-300/40 dark:bg-gray-500/20 rounded-xl focus:border-primary focus:dark:border-primary-400"
      {...rest}
    >
      <Icon
        icon="search"
        variant="feather"
        className={cn(
          "text-gray-500 dark:text-gray-400 text-base mr-1.5 self-center mb-0.5",
          active && "text-gray-500/60 dark:text-gray-400/50"
        )}
      />

      <TextInput
        clearButtonMode="always"
        keyboardType="default"
        returnKeyType="search"
        className={cn(
          "flex-1 font-pregular text-black dark:text-white self-center pt-0.5"
        )}
        style={{ fontSize: 14 }}
        value={text}
        placeholder={placeholder}
        onChangeText={onTextChange}
        onSubmitEditing={() => onSearch(text)}
        placeholderTextColor={
          scheme == "dark" ? palette.gray400 : palette.gray500
        }
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
      {text != "" && (
        <TouchableOpacity
          className="items-center justify-center px-2"
          activeOpacity={0.6}
          onPress={onClear}
        >
          <Icon
            icon="close"
            variant="ionicon"
            className={cn(
              "text-gray-500 dark:text-gray-400 text-base mr-1.5 self-center mb-0.5"
            )}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;
