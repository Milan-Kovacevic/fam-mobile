import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Accordion from "react-native-collapsible/Accordion";
import { AssetListDTO } from "@/storage/models/asset-lists";
import { RegistrarItemContent, RegistrarItemHeader } from "./RegistrarItem";
import FlatListSkeleton from "@/components/shared/list/FlatListSkeleton";

type RegistrarListProps = {
  registrar: AssetListDTO[];
  loading: boolean;
  onDeleteList: (id: number) => void;
  onDeleteListItem: (listId: number, itemId: number) => void;
  onEditListItem: (itemId: number) => void;
  onAddListItem: (listId: number) => void;
};

const RegistrarList = (props: RegistrarListProps) => {
  const {
    registrar,
    loading,
    onDeleteList,
    onDeleteListItem,
    onEditListItem,
    onAddListItem,
  } = props;

  const [activeSections, setActiveSections] = useState<number[]>([]);

  const updateSections = (activeSections: number[]) => {
    setActiveSections([...activeSections]);
  };

  return (
    <View className="flex-1 py-5 pb-0 mb-1">
      {loading ? (
        <FlatListSkeleton className="h-[66px]" />
      ) : (
        <Accordion
          activeSections={activeSections}
          sections={registrar}
          renderSectionTitle={() => <></>}
          containerStyle={{ backgroundColor: "transparent" }}
          sectionContainerStyle={{ backgroundColor: "transparent" }}
          renderAsFlatList={true}
          touchableComponent={TouchableOpacity}
          touchableProps={{
            activeOpacity: 0.8,
          }}
          renderHeader={(content: AssetListDTO) => (
            <RegistrarItemHeader assetList={content} onDelete={onDeleteList} />
          )}
          renderContent={(content: AssetListDTO) => (
            <RegistrarItemContent
              assetList={content}
              onEditListItem={onEditListItem}
              onDeleteListItem={onDeleteListItem}
              onAddListItem={onAddListItem}
            />
          )}
          onChange={updateSections}
        />
      )}
    </View>
  );
};

export default RegistrarList;
