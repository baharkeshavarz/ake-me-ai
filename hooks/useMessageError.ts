import { create } from "zustand"

type MessageErrorStore = {
    hasError: boolean,
    onError: () => void,
    onErrorClose: () => void,
}

export const useConfettiStore = create<MessageErrorStore>((set) => ({
   hasError: false,
   onError: () => set({ hasError: true }),
   onErrorClose: () => set({ hasError: false })
}));