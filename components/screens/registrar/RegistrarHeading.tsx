import { View } from "react-native";
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

type RegistrarHeadingProps = {
  onCreateList: () => void;
};

const RegistrarHeading = (props: RegistrarHeadingProps) => {
  const { onCreateList } = props;
  const { t } = useTranslation();

  return (
    <View className="flex-row mb-3.5 mt-0 items-center" {...props}>
      <View className="flex-1 flex-row w-full items-center gap-0.5 ml-0.5 justify-start">
        <Icon
          icon="list"
          variant="entypo"
          className="text-xl text-neutral-800 dark:text-neutral-200"
        />
        <Text className="text-2xl font-psemibold tracking-tighter pt-0.5 pl-0.5">
          {t("registrar.title")}
        </Text>
      </View>
      <View className="mr-0.5">
        <Button
          variant="ghost"
          LeftAccessory={() => (
            <Icon
              icon={"plus"}
              variant={"feather"}
              className="text-2xl text-neutral-800 dark:text-neutral-200"
            />
          )}
          className="p-2 py-0.5 self-center"
          onPressed={onCreateList}
        />
      </View>
    </View>
  );
};

export default RegistrarHeading;
