import { create } from 'zustand';

type trashBinStore = {
  menuIsOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

export const useTrashBin = create<trashBinStore>(set => ({
  menuIsOpen: false,
  openMenu: () => set({ menuIsOpen: true }),
  closeMenu: () => set({ menuIsOpen: false }),
}));
