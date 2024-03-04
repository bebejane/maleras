import { create } from "zustand";
import { shallow } from 'zustand/shallow';

export interface StoreState {
  showContact: boolean,
  setShowContact: (showContact: boolean) => void,
}

const useStore = create<StoreState>((set) => ({
  showContact: false,
  setShowContact: (showContact: boolean) => {
    set((state) => ({ showContact }))
  },
}));

export { shallow, useStore };
