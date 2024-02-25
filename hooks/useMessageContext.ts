import { ContextValues } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MessageContextStore = {
  contextValues: ContextValues;
  onChangeContext: (item: ContextValues) => void;
  onRemove: () => void;
};

const initialValue = {
  contextType: "",
  contextId: 0,
  hologram: "",
  selectedProfile: 0,
};

export const useMessageContext = create(
  persist(
  (set: any) => ({
      contextValues: initialValue,
      onChangeContext: (item: ContextValues) => set({ contextValues: item }),
      onRemove: () => set({ contextValues: initialValue }),
    }),
    {
      name: "context-info",
    }
    )
 );
