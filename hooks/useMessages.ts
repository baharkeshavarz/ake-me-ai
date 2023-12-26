import { ChatMessageResponse } from '@/types';
import {create} from 'zustand';

interface MessageStoreState {
  chatList: ChatMessageResponse[];
  addMessage: (item: ChatMessageResponse) => void;
  removeMessage: (index: number) => void;
  removeList: () => void;
}

const useMessageStore = create<MessageStoreState>((set) => {
  // Try to get the data from localStorage on initialization
  const savedChatList = localStorage.getItem('chatList');
  const initialState = savedChatList ? { chatList: JSON.parse(savedChatList) } : { chatList: [] };

  return {
    ...initialState,
    addMessage: (item) => set((state) => {
      const newChatList = [...state.chatList, item];
      localStorage.setItem('chatList', JSON.stringify(newChatList));
      return { chatList: newChatList };
    }),
    removeMessage: (index) => set((state) => {
      const newChatList = state.chatList.filter((_, i) => i !== index);
      localStorage.setItem('chatList', JSON.stringify(newChatList));
      return { chatList: newChatList };
    }),
    removeList: () => set(() => {
        localStorage.removeItem('chatList');
        return { chatList: [] };
      }),
  };
});

export default useMessageStore;
