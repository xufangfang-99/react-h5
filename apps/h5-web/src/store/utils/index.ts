import { atom } from "jotai";
// 移除未使用的类型导入

/**
 * 创建异步原子 - 用于数据请求
 * 后续页面模板可以使用这个工具
 */
export function createAsyncAtom<T>(
  fetcher: () => Promise<T>,
  initialValue?: T,
) {
  const loadingAtom = atom(false);
  const errorAtom = atom<Error | null>(null);
  const dataAtom = atom<T | undefined>(initialValue);

  const refreshAtom = atom(null, async (_get, set) => {
    // 添加下划线前缀表示未使用
    set(loadingAtom, true);
    set(errorAtom, null);
    try {
      const data = await fetcher();
      set(dataAtom, data);
      return data;
    } catch (error) {
      set(errorAtom, error as Error);
      throw error;
    } finally {
      set(loadingAtom, false);
    }
  });

  return {
    dataAtom,
    loadingAtom,
    errorAtom,
    refreshAtom,
  };
}

/**
 * 创建列表原子 - 用于列表数据管理
 * 提供增删改查的便捷操作
 */
export function createListAtom<T extends { id: string | number }>(
  initialValue: T[] = [],
) {
  const listAtom = atom(initialValue);

  const actionsAtom = atom(
    null,
    (
      get,
      set,
      action: {
        type: "add" | "update" | "remove" | "set";
        payload?: any;
      },
    ) => {
      const currentList = get(listAtom);

      switch (action.type) {
        case "add":
          set(listAtom, [...currentList, action.payload]);
          break;
        case "update":
          set(
            listAtom,
            currentList.map((item) =>
              item.id === action.payload.id
                ? { ...item, ...action.payload.data }
                : item,
            ),
          );
          break;
        case "remove":
          set(
            listAtom,
            currentList.filter((item) => item.id !== action.payload),
          );
          break;
        case "set":
          set(listAtom, action.payload);
          break;
      }
    },
  );

  return { listAtom, actionsAtom };
}
