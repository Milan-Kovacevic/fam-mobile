import React from "react";
import { SheetProps } from "react-native-actions-sheet";
import BaseActionSheet from "./BaseActionSheet";
import { useSQLiteContext } from "expo-sqlite";
import useReadonlyList from "@/hooks/useReadonlyList";
import { EmployeeDTO } from "@/storage/models/employees";
import { getAllEmployees } from "@/storage/repositories/employees-repository";
import EmployeesList from "@/components/screens/employees/EmployeesList";
import { Text } from "@/components/ui/Text";
import ScrollableSheetContainer from "./ScrollableSheetContainer";
import { useTranslation } from "react-i18next";

const EmployeesSheet = (props: SheetProps<"employees-sheet">) => {
  const { t } = useTranslation();
  const { payload } = props;
  const db = useSQLiteContext();
  const { loading, listData: employees } = useReadonlyList<EmployeeDTO>({
    fetchData: fetchEmployees,
  });

  async function fetchEmployees() {
    const result = await getAllEmployees(db);
    return result;
  }

  function handleEmployeeSelected(id: number) {
    var employee = employees.find((x) => x.id == id);
    payload?.onEmployeeSelected(employee);
  }

  return (
    <BaseActionSheet>
      <Text variant="neutral" className="mx-2 mb-2 text-base text-center">
        {t("sheets.employeesTitle")}
      </Text>
      <ScrollableSheetContainer>
        <EmployeesList
          className="mt-1 pt-0 flex-1"
          readonly={true}
          pressable={true}
          employees={employees}
          loading={loading}
          onItemPressed={handleEmployeeSelected}
          scrollEnabled={false}
        />
      </ScrollableSheetContainer>
    </BaseActionSheet>
  );
};

export default EmployeesSheet;
