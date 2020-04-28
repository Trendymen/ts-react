import { useMap, CHANGE_ALL_MAP } from "./useMap";
import { useCallback } from "react";

interface Option {
  /** 用来在map中记录勾选状态的key 一般取id */
  key?: string;
}

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

export const useChecked = <T extends Record<string, any>>(
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

  const filterChecked: FilterChecked<T> = (): T[] =>
    dataSource.filter((data) => {
      return map[data[keyName]];
    });

  const checkedAll = !dataSource.some((data) => {
    return !map[data[keyName]];
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
