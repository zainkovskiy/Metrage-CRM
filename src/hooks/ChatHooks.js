export const useFindCurrentChat = (chatList, button) => {
  return chatList.chats.find((item) => button === 'chat' ? !item?.isOpenLines : item?.isOpenLines) || null;
} 