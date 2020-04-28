import { useMap, CHANGE_ALL_MAP } from "./useMap";
import { useCallback } from "react";

type CheckedMap = {
  [key: string]: boolean;
};

interface FilterChecked<T> {
  (): T[];
}
export interface OnCheckedChange<T> {
  (dataItem: T, checked: boolean): void;
}

interface OnCheckedAllChange {
  (newCheckedAll: boolean): void;
}

export const useChecked = <T extends Record<string, unknown>>(
  dataSource: T[],
  keyName: keyof T = "id"
): {
  checkedMap: CheckedMap;
  filterChecked: FilterChecked<T>;
  checkedAll: boolean;
  onCheckedChange: OnCheckedChange<T>;
  onCheckedAllChange: OnCheckedAllChange;
} => {
  const { map, dispatch, onMapChange } = useMap(dataSource);
  const onCheckedChange = useCallback(
    (dataItem: T, checked: boolean): void => {
      onMapChange(dataItem, checked);
    },
    [onMapChange]
  );

  const filterChecked: FilterChecked<T> = useCallback(
    (): T[] =>
      dataSource.filter((data) => {
        return map[data[keyName] as string];
      }),
    [map, dataSource, keyName]
  );

  const checkedAll = !dataSource.some((data) => {
    return !map[data[keyName] as string];
  });

  const onCheckedAllChange = (newCheckedAll: boolean): void => {
    // 全选
    const payload = newCheckedAll;
    dispatch({
      type: CHANGE_ALL_MAP,
      payload,
    });
  };

  return {
    checkedMap: map as CheckedMap,
    filterChecked,
    checkedAll,
    onCheckedChange,
    onCheckedAllChange,
  };
};
