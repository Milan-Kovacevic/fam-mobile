import { useColorScheme, View } from "react-native";
import React, { useEffect } from "react";
import {
  $horizontalPaddingClassName,
  SafeScreen,
} from "@/components/ui/Screen";
import { cn } from "@/utils/tw";
import RegistrarHeading from "@/components/screens/registrar/RegistrarHeading";
import SearchInput from "@/components/ui/SearchInput";
import RegistrarList from "@/components/screens/registrar/RegistrarList";
import { useSQLiteContext } from "expo-sqlite";
import { showToast } from "@/utils/toast";
import useCompositeList from "@/hooks/useCompositeList";
import { router, useLocalSearchParams } from "expo-router";
import {
  createEmptyRegistrarItem,
  deleteInventoryListItem,
  deleteRegistrarItem,
  getAssetRegistrar,
  searchAssetRegistrar,
} from "@/storage/services/registrar-service";
import { getAllAssetListItems } from "@/storage/repositories/asset-list-repository";

const RegistrarScreen = () => {
  const db = useSQLiteContext();
  const { create } = useLocalSearchParams();
  const scheme = useColorScheme();
  const {
    searchText,
    loading,
    listData,
    refreshing,
    onRefreshing,
    onSearch,
    onSearchClear,
    onSearchTextChanged,
    onDeleteList,
    onCreateList,
    onDeleteListItem,
  } = useCompositeList({
    fetchData: fetchInventoryLists,
    searchData: searchInventoryLists,
    onDelete: handleDeleteRegistrarItem,
    onCreate: handleCreateRegistrarItem,
    onDeleteItem: handleDeleteInventoryListItem,
    onEditItem: handleEditInventoryListItem,
  });

  useEffect(() => {
    if (!create) return;

    onCreateList().then((result) => {
      if (result) handleAddInventoryListItem(result?.id);
    });
  }, []);

  async function fetchInventoryLists() {
    return await getAssetRegistrar(db);
  }

  async function searchInventoryLists(query: string) {
    return await searchAssetRegistrar(db, query);
  }

  async function handleCreateRegistrarItem() {
    try {
      var item = await createEmptyRegistrarItem(db);
      showToast("Created empty Inventory list...", scheme);
      return item;
    } catch {
      showToast("Error creating Inventory list", scheme);
      return null;
    }
  }

  async function handleDeleteRegistrarItem(id: number) {
    var isSuccess = await deleteRegistrarItem(db, id);
    if (isSuccess) showToast("Inventory list removed successfully!", scheme);
    return isSuccess;
  }

  async function handleDeleteInventoryListItem(listId: number, itemId: number) {
    var isSuccess = await deleteInventoryListItem(db, listId, itemId);
    if (isSuccess)
      showToast("Inventory list item removed successfully!", scheme);
    return isSuccess;
  }

  async function handleEditInventoryListItem(itemId: number) {
    router.push({
      pathname: "/edit/asset-list-item",
      params: { id: itemId },
    });
  }

  async function handleAddInventoryListItem(listId: number) {
    router.push({
      pathname: "/create/asset-list-item",
      params: { id: listId },
    });
  }

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
        <RegistrarHeading onCreateList={onCreateList} />
        <View className="mb-1.5">
          <SearchInput
            className=""
            placeholder="Search..."
            text={searchText}
            onTextChange={onSearchTextChanged}
            onSearch={onSearch}
            onClear={onSearchClear}
          />
          <RegistrarList
            loading={loading}
            refreshing={refreshing}
            onRefreshing={onRefreshing}
            registrar={listData}
            onDeleteList={onDeleteList}
            onDeleteListItem={onDeleteListItem}
            onEditListItem={handleEditInventoryListItem}
            onAddListItem={handleAddInventoryListItem}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default RegistrarScreen;
