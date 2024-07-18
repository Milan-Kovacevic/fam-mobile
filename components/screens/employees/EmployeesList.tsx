import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { ComponentType } from "react";
import { EmployeeDTO } from "@/storage/models/employees";
import EmployeeCard from "./EmployeeCard";
import EmptyListPlaceholder from "@/components/lists/EmptyListPlaceholder";

type EmployeesListProps = {
  employees: EmployeeDTO[];
  refreshing: boolean;
  onRefreshing: () => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const EmployeesList = (props: EmployeesListProps) => {
  const { employees, refreshing, onRefreshing, onEdit, onDelete } = props;

  return (
    <FlatList
      className="px-0"
      showsVerticalScrollIndicator={false}
      data={employees}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
      }
      renderItem={({ item }) => {
        return <EmployeeCard item={item} onDelete={onDelete} onEdit={onEdit} />;
      }}
      ListEmptyComponent={
        <EmptyListPlaceholder
          title={"No Employees Found"}
          description=" Parhaps you should ajust your search critera or add a new employee..."
        />
      }
    />
  );
};

export default EmployeesList;
