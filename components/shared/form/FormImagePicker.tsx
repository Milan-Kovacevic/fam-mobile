import { useColorScheme, View, ViewProps } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";
import * as ImagePicker from "expo-image-picker";
import { showToast } from "@/utils/toast";
import { useTranslation } from "react-i18next";

interface FormImagePickerProps extends ViewProps {
  onImageSelected: (image: string) => void;
  image?: string;
}

const FormImagePicker = (props: FormImagePickerProps) => {
  const { image: $image, onImageSelected, ...rest } = props;
  const [image, setImage] = useState<string>($image ?? "");
  const scheme = useColorScheme();
  const { t } = useTranslation();

  async function handleSelectImage() {
    try {
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
    } catch (err) {
      showToast(t("assets.imageLibraryError"), scheme);
      console.log(err);
    }
  }

  async function handleTakePicture() {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 7],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        onImageSelected(result.assets[0].uri);
      }
    } catch (err) {
      showToast(t("assets.cameraPermissionError"), scheme);
      console.log(err);
    }
  }

  function handleClearPicture() {
    setImage("");
    onImageSelected("");
  }

  return (
    <View className="flex-1" {...rest}>
      <Image
        resizeMode="contain"
        className="flex-1 opacity-100 bg-primary-100/60 dark:bg-primary-900/60 rounded-xl h-[153px] w-full overflow-hidden"
        src={image}
      />
      {image && (
        <View className="absolute bg-primary-50 -right-1.5 self-center dark:bg-primary-950 rounded-full">
          <Button
            variant="ghost"
            LeftAccessory={() => (
              <Icon icon="close" variant="material" className="text-xl" />
            )}
            className="px-1 py-0 rounded-full self-stretch"
            onPressed={handleClearPicture}
          />
        </View>
      )}

      <View className="absolute -bottom-2 flex-row self-center gap-x-2">
        <View className="bg-primary-50 self-center dark:bg-primary-950 rounded-full">
          <Button
            variant="primary-outline"
            LeftAccessory={() => (
              <Icon
                icon="camera-outline"
                variant="ionicon"
                className="text-xl"
              />
            )}
            className="p-2 py-1 rounded-full self-center"
            onPressed={handleTakePicture}
          />
        </View>
        <View className="bg-primary-50 self-center dark:bg-primary-950 rounded-full">
          <Button
            variant="primary-outline"
            LeftAccessory={() => (
              <Icon
                icon="image-outline"
                variant="ionicon"
                className="text-xl"
              />
            )}
            className="p-2 py-1 rounded-full min-w-0 w-auto"
            onPressed={handleSelectImage}
          />
        </View>
      </View>
    </View>
  );
};

export default FormImagePicker;
