import { View, ViewProps } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";
import * as ImagePicker from "expo-image-picker";

interface FormImagePickerProps extends ViewProps {
  onImageSelected: (image: string) => void;
  image?: string;
}

const FormImagePicker = (props: FormImagePickerProps) => {
  const { image: $image, onImageSelected, ...rest } = props;
  const [image, setImage] = useState<string>($image ?? "");

  async function handleSelectImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 7],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  }

  async function handleTakePicture() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 7],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View className="flex-1" {...rest}>
      <Image
        resizeMode="contain"
        className="flex-1 opacity-100 bg-primary-100/60 dark:bg-primary-900/60 rounded-xl h-[153px] w-full overflow-hidden"
        src={image}
      />
      <View className="absolute -bottom-2 flex-row self-center gap-x-2">
        <View className="bg-primary-50 self-center dark:bg-primary-950 rounded-full">
          <Button
            variant="secondary"
            LeftAccessory={() => (
              <Icon
                icon="camera-plus-outline"
                variant="material-community"
                className="text-xl"
              />
            )}
            className="p-2 py-1 rounded-full bg-secondary-200 dark:bg-secondary-600"
            onPressed={handleTakePicture}
          />
        </View>
        <View className="bg-primary-50 self-center dark:bg-primary-950 rounded-full">
          <Button
            variant="secondary"
            LeftAccessory={() => (
              <Icon
                icon="image-outline"
                variant="ionicon"
                className="text-xl"
              />
            )}
            className="p-2 py-1 rounded-full bg-secondary-200 dark:bg-secondary-600"
            onPressed={handleSelectImage}
          />
        </View>
      </View>
    </View>
  );
};

export default FormImagePicker;
