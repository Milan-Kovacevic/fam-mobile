import {
  View,
  ImageBackground,
  Dimensions,
  useColorScheme,
} from "react-native";
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { AssetDetailsDTO } from "@/storage/models/assets";
import { Text } from "@/components/ui/Text";
import emptyImageLight from "@/assets/images/no-image-light.png";
import emptyImageDark from "@/assets/images/no-image-dark.png";

type AssetDetailsImageProps = {
  asset?: AssetDetailsDTO;
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

const AssetDetailsImage = (props: AssetDetailsImageProps) => {
  const { asset } = props;
  const scheme = useColorScheme();
  return (
    <ImageBackground
      resizeMode="cover"
      className="opacity-100 bg-primary-100/60 dark:bg-primary-900/60 rounded-xl rounded-b-none mt-1 w-full overflow-hidden"
      src={asset?.image}
      source={
        asset?.image
          ? undefined
          : scheme == "dark"
          ? emptyImageDark
          : emptyImageLight
      }
      style={{ height: SCREEN_HEIGHT / 4 }}
    >
      <View className="flex-row items-center absolute bottom-2.5 right-2.5 bg-primary-100 dark:bg-primary-900 rounded-2xl p-3 py-1">
        <Icon
          icon={"qr-code"}
          variant={"material"}
          className="text-base mr-1 text-gray-800 dark:text-gray-200"
        />
        <Text className="font-pmedium pt-0.5 text-gray-800 dark:text-gray-200">
          {asset?.barcode}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default AssetDetailsImage;
