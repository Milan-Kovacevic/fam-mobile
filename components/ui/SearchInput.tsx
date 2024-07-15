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
  handleSearch: (text: string) => void;
}

const SearchInput = (props: SearchInputProps) => {
  const { text, placeholder, handleSearch, ...rest } = props;
  const scheme = useColorScheme();
  const [searchText, setSearchText] = useState(text);
  const [active, setActive] = useState(false);

  function handleClearText() {
    setSearchText("");
  }

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
        value={searchText}
        placeholder={placeholder}
        onChangeText={setSearchText}
        onSubmitEditing={() => handleSearch(searchText)}
        placeholderTextColor={
          scheme == "dark" ? palette.gray400 : palette.gray500
        }
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
      {searchText != "" && (
        <TouchableOpacity
          className="items-center justify-center px-2"
          activeOpacity={0.6}
          onPress={handleClearText}
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
