import { create } from 'zustand';

type searchStore = {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
};

export const useSearch = create<searchStore>((set, get) => ({
  modalIsOpen: false,
  openModal: () => set({ modalIsOpen: true }),
  closeModal: () => set({ modalIsOpen: false }),
  toggleModal: () => set({ modalIsOpen: !get().modalIsOpen }),
}));
