import { ContextValues } from "@/types";
import { create } from "zustand"

type MessageContextStore = {
    contextValues: ContextValues,
    onChange: (item: ContextValues) => void,
    onRemove: () => void;
}

const initialValue = {
    contextType: "",
    contextId: 0,
    hologram: ""
};

export const useMessageContext = create<MessageContextStore>((set) => ({
   contextValues: initialValue,
   onChange: (item) => set({ contextValues: item }),
   onRemove: () => set({contextValues: initialValue}),
}));