import { useEffect, useState } from "react";
import { delay } from "@/utils/util";

type UseReadonlyListProps<T> = {
  fetchData: () => Promise<T[]>;
};

function useReadonlyList<T>(props: UseReadonlyListProps<T>) {
  const { fetchData } = props;
  const [listData, setListData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListData();
  }, []);
  async function loadListData() {
    setLoading(true);
    await delay(500);
    const result = await fetchData();
    setListData(result);
    setLoading(false);
  }

  return { listData, loading };
}

export default useReadonlyList;
