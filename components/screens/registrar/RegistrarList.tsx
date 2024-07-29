import { RefreshControl, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Accordion from "react-native-collapsible/Accordion";
import { AssetListDTO } from "@/storage/models/asset-lists";
import { RegistrarItemContent, RegistrarItemHeader } from "./RegistrarItem";
import FlatListSkeleton from "@/components/shared/list/FlatListSkeleton";
import EmptyListPlaceholder from "@/components/shared/list/EmptyListPlaceholder";
import { useTranslation } from "react-i18next";

type RegistrarListProps = {
  registrar: AssetListDTO[];
  loading: boolean;
  refreshing: boolean;
  onRefreshing: () => void;
  onDeleteList: (id: number) => void;
  onDeleteListItem: (listId: number, itemId: number) => void;
  onEditListItem: (itemId: number) => void;
  onAddListItem: (listId: number) => void;
};

const RegistrarList = (props: RegistrarListProps) => {
  const {
    registrar,
    loading,
    refreshing,
    onRefreshing,
    onDeleteList,
    onDeleteListItem,
    onEditListItem,
    onAddListItem,
  } = props;
  const { t } = useTranslation();
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const updateSections = (activeSections: number[]) => {
    setActiveSections([...activeSections]);
  };

  return (
    <View className="flex-1 py-5 mb-6 pb-0">
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing ?? false}
              onRefresh={onRefreshing}
            />
          }
          ListEmptyComponent={
            <EmptyListPlaceholder
              title={t("registrar.emptyListTitle")}
              description={t("registrar.emptyListDescription")}
            />
          }
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
