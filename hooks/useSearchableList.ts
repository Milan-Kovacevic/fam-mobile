import { delay } from "@/utils/util";
import { useEffect, useState } from "react";

type BaseListData = {
  id: number;
};

type UseSearchableListProps<T extends BaseListData> = {
  fetchData: () => Promise<T[]>;
  searchData: (query: string) => Promise<T[]>;
  onEdit: (id: number) => void;
  onDelete: (id: number) => Promise<boolean>;
};

function useSearchableList<T extends BaseListData>(
  props: UseSearchableListProps<T>
) {
  const { fetchData, searchData, onEdit, onDelete } = props;
  const [listData, setListData] = useState<T[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadListData();
  }, []);

  async function loadListData() {
    setLoading(true);
    await delay(300);
    const result = await fetchData();
    setListData(result);
    setLoading(false);
  }
  async function searchListData(query: string) {
    setLoading(true);
    await delay(300);
    const result = await searchData(query);
    setListData(result);
    setLoading(false);
  }

  async function onSearchClear() {
    setSearchText("");
    await loadListData();
  }

  async function onSearchTextChanged(text: string) {
    setSearchText(text);
    if (text == "") await loadListData();
  }

  async function onSearch() {
    await searchListData(searchText);
  }

  async function onRefreshing() {
    setRefreshing(true);
    await loadListData();
    setRefreshing(false);
    setSearchText("");
  }

  function onEditItem(id: number) {
    onEdit(id);
  }

  async function onDeleteItem(id: number) {
    var isSuccess = await onDelete(id);
    if (isSuccess) {
      setListData([...listData.filter((x) => x.id != id)]);
    }
  }

  return {
    onSearchClear,
    onSearch,
    onRefreshing,
    onEditItem,
    onDeleteItem,

    listData,
    refreshing,
    loading,
    searchText,
    onSearchTextChanged,
  };
}

export default useSearchableList;
