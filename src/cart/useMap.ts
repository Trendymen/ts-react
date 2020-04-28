import { useReducer, useCallback, Dispatch } from "react";

export const CHANGE_MAP = "CHANGE_MAP";
export const CHANGE_ALL_MAP = "CHANGE_ALL_MAP";
export const SET_MAP = "SET_MAP";

type MapType = {
  [p: string]: unknown;
};

interface ActionChangeMap<T> {
  type: typeof CHANGE_MAP;
  payload: { dataItem: T; value: unknown };
}

interface ActionChangeAllMap {
  type: typeof CHANGE_ALL_MAP;
  payload: unknown;
}

interface ActionSetMap {
  type: typeof SET_MAP;
  payload: MapType;
}

type Action<T> = ActionChangeMap<T> | ActionChangeAllMap | ActionSetMap;
interface OnMapChange<T> {
  (dataItem: T, value: unknown): void;
}

export const useMap = <T extends Record<string, unknown>>(
  dataSource: T[],
  keyName: keyof T = "id"
): {
  map: MapType;
  dispatch: Dispatch<Action<T>>;
  onMapChange: OnMapChange<T>;
} => {
  const [map, dispatch] = useReducer(
    (currentMap: MapType, action: Action<T>): MapType => {
      switch (action.type) {
        case CHANGE_MAP: {
          const { payload } = action;
          const {
            dataItem: { [keyName]: targetKey },
            value,
          } = payload;
          return { ...currentMap, [targetKey as string]: value };
        }
        case CHANGE_ALL_MAP: {
          const { payload } = action;
          const newMap: MapType = {};
          dataSource.forEach((dataItem) => {
            const targetKey = dataItem[keyName] as string;
            newMap[targetKey] = payload;
          });
          return newMap;
        }
        case SET_MAP:
          return action.payload;
      }
      return {};
    },
    {}
  );

  const onMapChange: OnMapChange<T> = useCallback((dataItem: T, value: any) => {
    const action: ActionChangeMap<T> = {
      type: CHANGE_MAP,
      payload: { dataItem, value },
    };
    dispatch(action);
  }, []);
  return { map, dispatch, onMapChange };
};
