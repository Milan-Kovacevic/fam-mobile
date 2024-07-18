import { View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/Text";
import { Screen } from "@/components/ui/Screen";
import ManageAssetHeading from "@/components/screens/assets/ManageAssetHeading";

const CreateAssetScreen = () => {
  return (
    <Screen className="h-full w-full px-3 my-4 mt-6" variant="scroll">
      <View className="px-2 flex-1">
        <ManageAssetHeading
          className="mb-6"
          text="Please enter the required data and press 'Submit' to create new asset."
        />

        {/* <ManageLocationForm
          loading={loading}
          onSubmit={handleLocationSubmitted}
        /> */}
      </View>
    </Screen>
  );
};

export default CreateAssetScreen;
