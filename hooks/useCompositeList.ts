import { delay } from "@/utils/util";
import { useEffect, useState } from "react";

type BaseListItemData = {
  id: number;
};
type BaseListData = {
  id: number;
  items: BaseListItemData[];
};

type UseCompositeListProps<T extends BaseListData> = {
  fetchData: () => Promise<T[]>;
  searchData: (query: string) => Promise<T[]>;
  onDelete: (id: number) => Promise<boolean>;
  onCreate: () => Promise<T | null>;
  onDeleteItem: (id: number) => Promise<boolean>;
  onEditItem: (id: number) => Promise<void>;
};

function useCompositeList<T extends BaseListData>(
  props: UseCompositeListProps<T>
) {
  const { fetchData, searchData, onDelete, onCreate, onDeleteItem } = props;
  const [listData, setListData] = useState<T[]>([]);
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

  async function onDeleteList(id: number) {
    if (!onDelete) return;
    var isSuccess = await onDelete(id);
    if (isSuccess) {
      setListData([...listData.filter((x) => x.id != id)]);
    }
  }

  async function onDeleteListItem(listId: number, itemId: number) {
    if (!onDelete) return;

    var list = listData.find((x) => x.id == listId);
    if (!list) return;

    var isSuccess = await onDeleteItem(itemId);
    const newItems = [...list.items.filter((x) => x.id != itemId)];
    list = { ...list, items: newItems };

    if (isSuccess) {
      setListData([...listData.filter((x) => x.id != listId), list]);
    }
  }

  async function onCreateList() {
    if (!onCreate) return;
    var listItem = await onCreate();
    if (listItem) {
      setListData([...listData, listItem]);
    }

    return listItem;
  }

  return {
    onDeleteList,
    onCreateList,
    onDeleteListItem,
    listData,
    loading,
    searchText,
    onSearchTextChanged,
    onSearchClear,
    onSearch,
  };
}

export default useCompositeList;
