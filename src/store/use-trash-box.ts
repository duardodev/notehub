import { create } from 'zustand';

type trashBoxStore = {
  menuIsOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

export const useTrashBox = create<trashBoxStore>((set, get) => ({
  menuIsOpen: false,
  openMenu: () => set({ menuIsOpen: true }),
  closeMenu: () => set({ menuIsOpen: false }),
}));
