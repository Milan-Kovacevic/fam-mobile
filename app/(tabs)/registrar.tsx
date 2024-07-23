import { View } from "react-native";
import React from "react";
import {
  $horizontalPaddingClassName,
  SafeScreen,
} from "@/components/ui/Screen";
import { cn } from "@/utils/tw";
import RegistrarHeading from "@/components/screens/registrar/RegistrarHeading";

const RegistrarScreen = () => {
  function handleCreateList() {}

  return (
    <SafeScreen
      variant="fixed"
      className="h-full w-full"
      contentContainerClassName="flex-1"
    >
      <View
        className={cn(
          "pt-3.5 mb-1.5 items-center",
          $horizontalPaddingClassName
        )}
      >
        <RegistrarHeading onCreateList={handleCreateList} />
      </View>
    </SafeScreen>
  );
};

export default RegistrarScreen;
