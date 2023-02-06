import { defineStore } from "pinia";
import { MenuOption } from '@/typings/System'

export type RootState = {
  isMenuLoading: boolean,
  menuOptions: MenuOption[] | null,
};

export const useSystemStore = defineStore('system', {
  state: () =>
    ({
      isMenuLoading: false,
      menuOptions: null,
    } as RootState),
  actions: {
    setMenuOptions(options: MenuOption[] | null) {
      this.menuOptions = options;
    }
  }
})
