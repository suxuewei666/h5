import { defineStore } from "pinia";

export const useUserStore = defineStore("useUserStore", {
  state: () => ({
    value: {} as ToIndexable<any>
  }),
  actions: {
    setUserInfo(payload: any) {
      this.value = payload as ToIndexable<any>;
    },
    removeUserInfo() {
      this.value = {} as ToIndexable<any>;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "XYOperationPlatformUserStore",
        storage: localStorage
      }
    ]
  }
});
