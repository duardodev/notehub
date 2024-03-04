import { create } from 'zustand';

type recycleBinStore = {
  menuIsOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

export const useRecycleBinStore = create<recycleBinStore>((set, get) => ({
  menuIsOpen: false,
  openMenu: () => set({ menuIsOpen: true }),
  closeMenu: () => set({ menuIsOpen: false }),
}));
