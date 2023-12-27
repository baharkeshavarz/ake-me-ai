import  { useState, useEffect } from 'react';
import { ChatMessageResponse } from '@/types';

interface MessageStoreState {
  chatList: ChatMessageResponse[];
  addMessage: (item: ChatMessageResponse) => void;
  updateMessage: (id: string, updatedMessage: ChatMessageResponse) => void;
  removeMessage: (index: number) => void;
  removeList: () => void;
}

export const useMessageStoreNew = (): MessageStoreState => {
  // Try to get the data from localStorage on initialization
  const savedChatList = typeof window !== 'undefined' ? localStorage.getItem('chatList') : null;
  const initialState: MessageStoreState = savedChatList ? { chatList: JSON.parse(savedChatList) } : { chatList: [] };

  const [state, setState] = useState<MessageStoreState>(initialState);

  useEffect(() => {
    // Update localStorage whenever the state changes
    localStorage.setItem('chatList', JSON.stringify(state.chatList));
  }, [state.chatList]);

  const addMessage = (item: ChatMessageResponse): void => {
    console.log("addMessage", state.chatList);
    setState((prev) => ({ chatList: [...prev.chatList, item] }));
  };

  const updateMessage = (id: string, updatedMessage: ChatMessageResponse): void => {
    console.log("id", id);
    console.log("updateMessage", updateMessage);

    setState((prev) => ({
      chatList: prev.chatList.map((message) => (message.id === id ? { ...message, ...updatedMessage } : message)),
    }));
  };

  const removeMessage = (index: number): void => {
    setState((prev) => ({
      chatList: prev.chatList.filter((_, i) => i !== index),
    }));
  };

  const removeList = (): void => {
    setState({ chatList: [] });
  };

  return { ...state, addMessage, updateMessage, removeMessage, removeList };
};

