import { create } from "zustand"

type MessageErrorStore = {
    hasError: boolean,
    onError: () => void,
    onErrorClose: () => void,
}

export const useMessageError = create<MessageErrorStore>((set) => ({
   hasError: false,
   onError: () => set({ hasError: true }),
   onErrorClose: () => set({ hasError: false })
}));