import { create } from "zustand"

type ChatNumberProps = {
    inx: number,
    onSet: (newIndex: number) => void;
    onRemove: () => void,
}

export const useChatNumber = create<ChatNumberProps>((set) => ({
    inx: 1,
    onSet: (newIndex: number) => {set({ inx: newIndex })},
    onRemove: () => set({ inx: 0 }),
}));