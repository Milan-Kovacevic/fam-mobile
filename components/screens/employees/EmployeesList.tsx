import { View, Text, FlatList, RefreshControl, ViewProps } from "react-native";
import React, { ComponentType } from "react";
import { EmployeeDTO } from "@/storage/models/employees";
import EmployeeCard from "./EmployeeCard";
import EmptyListPlaceholder from "@/components/shared/list/EmptyListPlaceholder";
import FlatListSkeleton from "@/components/shared/list/FlatListSkeleton";

interface EmployeesListProps extends ViewProps {
  employees: EmployeeDTO[];
  loading: boolean;
  refreshing?: boolean;
  onRefreshing?: () => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  readonly?: boolean;
  pressable?: boolean;
  onItemPressed?: (id: number) => void;
  scrollEnabled?: boolean;
}

const EmployeesList = (props: EmployeesListProps) => {
  const {
    employees,
    refreshing,
    loading,
    onRefreshing,
    onEdit,
    onDelete,
    readonly,
    pressable,
    onItemPressed,
    scrollEnabled,
    ...rest
  } = props;
  const scrollable = scrollEnabled ?? true;

  return (
    <View className="flex-1 py-5 pb-0 mb-1" {...rest}>
      {loading ? (
        <FlatListSkeleton />
      ) : (
        <FlatList
          scrollEnabled={scrollable}
          className="px-0"
          showsVerticalScrollIndicator={false}
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            readonly ? undefined : (
              <RefreshControl
                refreshing={refreshing ?? false}
                onRefresh={onRefreshing}
              />
            )
          }
          renderItem={({ item }) => {
            return (
              <EmployeeCard
                item={item}
                onDelete={onDelete}
                onEdit={onEdit}
                pressable={pressable}
                readonly={readonly}
                onPressed={onItemPressed}
              />
            );
          }}
          ListEmptyComponent={
            readonly ? (
              <EmptyListPlaceholder
                title={"No Employees"}
                description="Add some employees to be able to select them..."
              />
            ) : (
              <EmptyListPlaceholder
                title={"No Employees Found"}
                description="Parhaps you should ajust your search critera or add a new employee..."
              />
            )
          }
        />
      )}
    </View>
  );
};

export default EmployeesList;
