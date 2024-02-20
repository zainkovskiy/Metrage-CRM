import { getChatList, getNotification } from './chatSlice';

export const socketMiddleware = () => (params) => (next) => (action) => {
  let socket = null;
  const { dispatch, getState } = params;
  const { type } = action;
  if (type === 'socket/connect') {
    socket = new WebSocket('wss://crm.metragegroup.com:8000');
    if (!socket) {
      return;
    }
    socket.onopen = (e) => {
      console.log('[open] Соединение установлено');
      socket.send(
        JSON.stringify({
          token: metrage_id,
        })
      );
    };
    socket.onmessage = (event) => {
      let message = {};
      try {
        message = JSON.parse(event.data);
      } catch (e) {}
      if (message?.Action === 'Increment') {
        if (message?.Fields?.curState) {
          const notice = message?.Fields;
          const curState = message?.Fields?.curState;
          dispatch({ type: 'chat/setCounterMessage', payload: curState });
          dispatch({ type: 'notice/addNewNotice', payload: notice });
          dispatch(getNotification());
        }
      }
      if (message?.Action === 'chatMessage') {
        const chatMessage = message?.Fields;
        dispatch({ type: 'chat/addMessage', payload: chatMessage });
        dispatch(getChatList(true));
      }
    };
    return;
  }
  if (type === 'socket/disconnect') {
    if (!socket) {
      return;
    }
    socket.onclose((event) => {
      if (event.wasClean) {
        socket = null;
        alert(
          `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
        );
      } else {
        alert('[close] Соединение прервано');
      }
    });
  }
  return next(action);
};
