export const socketMiddleware = () => (params) => (next) => (action) => {
  let socket = null;
  const { dispatch, getState } = params
  const { type } = action
  if (type === 'socket/connect') {
    socket = new WebSocket("wss://crm.metragegroup.com:8000");
    socket.onopen = (e) => {
      console.log("[open] Соединение установлено");
      socket.send(JSON.stringify({
        token: metrage_id,
      }));
    }
    socket.onmessage = (event) => {
      let message = {};
      try {
        message = JSON.parse(event.data);
      } catch (e) {

      }
      if (message?.Action === "Increment") {
        if (message?.Fields?.curState){
          const curState = message?.Fields?.curState;
          dispatch({ type: 'chat/setCounterMessage', payload: curState});
        }
      }
    }
    return
  }
  if (type === 'socket/disconnect') {
    socket.onclose((event) => {
      if (event.wasClean) {
        socket = null;
        alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
      } else {
        alert('[close] Соединение прервано');
      }
    });
  }
  return next(action)
}