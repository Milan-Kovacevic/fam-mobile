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
import {
  createAssetList,
  deleteAssetList,
  deleteAssetListItem,
  getAllAssetLists,
} from "@/storage/repositories/asset-list-repository";
import { showToast } from "@/utils/toast";
import useCompositeList from "@/hooks/useCompositeList";
import { router, useLocalSearchParams } from "expo-router";

const RegistrarScreen = () => {
  const db = useSQLiteContext();
  const { create } = useLocalSearchParams();
  const scheme = useColorScheme();
  const {
    searchText,
    loading,
    listData,
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
    const result = await getAllAssetLists(db);
    return result;
  }

  async function searchInventoryLists(query: string) {
    const result = await getAllAssetLists(db);
    return result;
  }

  async function handleCreateRegistrarItem() {
    try {
      var item = await createAssetList(db, {
        dateCreated: new Date().getTime().toString(),
      });
      showToast("Created empty Inventory list...", scheme);
      return item;
    } catch {
      showToast("Error creating Inventory list", scheme);
      return null;
    }
  }

  async function handleDeleteRegistrarItem(id: number) {
    var isSuccess = await deleteAssetList(db, id);
    if (isSuccess) showToast("Inventory list removed successfully!", scheme);
    return isSuccess;
  }

  async function handleDeleteInventoryListItem(id: number) {
    var isSuccess = await deleteAssetListItem(db, id);
    if (isSuccess)
      showToast("Inventory list item removed successfully!", scheme);
    return isSuccess;
  }

  async function handleEditInventoryListItem(id: number) {
    showToast("Inventory list update invoked!", scheme);
    // TODO
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
