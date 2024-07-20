import AssetsHeading from "@/components/screens/assets/AssetsHeading";
import AssetsList from "@/components/screens/assets/AssetsList";
import {
  $horizontalPaddingClassName,
  SafeScreen,
} from "@/components/ui/Screen";
import SearchInput from "@/components/ui/SearchInput";
import useSearchableList from "@/hooks/useSearchableList";
import {
  deleteAsset,
  getAllAssets,
  searchForAssets,
} from "@/storage/repositories/assets-repository";
import { showToast } from "@/utils/toast";
import { cn } from "@/utils/tw";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const scheme = useColorScheme();
  const {
    searchText,
    loading,
    refreshing,
    listData,
    onSearch,
    onSearchClear,
    onSearchTextChanged,
    onDeleteItem,
    onEditItem,
    onRefreshing,
  } = useSearchableList({
    fetchData: fetchAssets,
    searchData: searchAssets,
    onDelete: handleDeleteAsset,
    onEdit: handleEditAsset,
  });

  async function fetchAssets() {
    const result = await getAllAssets(db);
    return result;
  }
  async function searchAssets(query: string) {
    const result = await searchForAssets(db, query);
    return result;
  }

  function handleCreateAsset() {
    router.push("/create/asset");
  }

  function handleEditAsset(id: number) {
    router.push({ pathname: `/edit/asset`, params: { id: id } });
  }

  async function handleDeleteAsset(id: number) {
    var isSuccess = await deleteAsset(db, id);
    if (isSuccess) {
      showToast("Asset removed successfully!", scheme);
    }
    return isSuccess;
  }

  function handleShowAssetDetails(id: number) {
    router.push("/create/asset");
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
        <AssetsHeading onCreateAsset={handleCreateAsset} />
        <View className="mb-1.5">
          <SearchInput
            className=""
            placeholder="Search..."
            text={searchText}
            onTextChange={onSearchTextChanged}
            onSearch={onSearch}
            onClear={onSearchClear}
          />
          <AssetsList
            loading={loading}
            assets={listData}
            pressable={true}
            onItemPressed={handleShowAssetDetails}
            refreshing={refreshing}
            onRefreshing={onRefreshing}
            onDelete={onDeleteItem}
            onEdit={onEditItem}
          />
        </View>
      </View>
    </SafeScreen>
  );
}
