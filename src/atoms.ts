import { atom, DefaultValue, selector } from "recoil";

export enum Categories {
  "toDo" = "TO_DO",
  "doing" = "DOING",
  "done" = "DONE",
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const catogortState = atom<Categories>({
  key: "category",
  default: Categories.toDo,
});

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [localStorageEffect("toDos")],
});

export const toDosState = selector({
  key: "toDos",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(catogortState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
