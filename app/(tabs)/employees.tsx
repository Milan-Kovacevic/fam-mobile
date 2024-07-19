import React, { useEffect } from "react";
import {
  $horizontalPaddingClassName,
  SafeScreen,
} from "@/components/ui/Screen";
import { useSQLiteContext } from "expo-sqlite";
import { useColorScheme, View } from "react-native";
import { router } from "expo-router";
import { showToast } from "@/utils/toast";
import EmployeesHeading from "@/components/screens/employees/EmployeesHeading";
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeesByName,
} from "@/storage/repositories/employees-repository";
import EmployeesList from "@/components/screens/employees/EmployeesList";
import SearchInput from "@/components/ui/SearchInput";
import useSearchableList from "@/hooks/useSearchableList";
import FlatListSkeleton from "@/components/shared/list/FlatListSkeleton";
import { cn } from "@/utils/tw";

const EmployeesScreen = () => {
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
    fetchData: fetchEmployees,
    searchData: searchEmployees,
    onDelete: handleDeleteEmployee,
    onEdit: handleEditEmployee,
  });

  async function fetchEmployees() {
    const result = await getAllEmployees(db);
    return result;
  }

  async function searchEmployees(query: string) {
    const result = await getEmployeesByName(db, query);
    return result;
  }

  function handleCreateEmployee() {
    router.push("/create/employee");
  }

  function handleEditEmployee(id: number) {
    router.push({ pathname: `/edit/employee`, params: { id: id } });
  }

  async function handleDeleteEmployee(id: number) {
    var isSuccess = await deleteEmployee(db, id);
    if (isSuccess) showToast("Employee removed successfully!", scheme);
    return isSuccess;
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
        <EmployeesHeading onCreateEmployee={handleCreateEmployee} />
        <View className="mb-1.5">
          <SearchInput
            className=""
            placeholder="Search..."
            text={searchText}
            onTextChange={onSearchTextChanged}
            onSearch={onSearch}
            onClear={onSearchClear}
          />
          <EmployeesList
            loading={loading}
            employees={listData}
            refreshing={refreshing}
            onRefreshing={onRefreshing}
            onDelete={onDeleteItem}
            onEdit={onEditItem}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default EmployeesScreen;
