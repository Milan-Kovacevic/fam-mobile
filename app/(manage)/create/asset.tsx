import { View } from "react-native";
import React from "react";
import { Screen } from "@/components/ui/Screen";
import ManageAssetForm, {
  AssetForm,
} from "@/components/screens/assets/ManageAssetForm";

const CreateAssetScreen = () => {
  return (
    <Screen
      className="h-full w-full px-3 my-4 mt-2.5 mb-6 pb-0"
      variant="scroll"
    >
      <View className="px-2 flex-1">
        <ManageAssetForm loading={false} onSubmit={(data: AssetForm) => {}} />
      </View>
    </Screen>
  );
};

export default CreateAssetScreen;
