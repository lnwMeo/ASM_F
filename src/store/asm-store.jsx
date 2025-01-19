import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


const asmStore = (set) => ({
  user: null,
  token: null,
  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:5000/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  actionLogout: () => {
    set({
      user: null,
      token: null,
    });
    localStorage.removeItem("asm-store");
   
  },
});

const usePersist = {
  name: "asm-store",
  storage: createJSONStorage(() => localStorage),
};

const useAsmStore = create(persist(asmStore, usePersist));



export default useAsmStore;
