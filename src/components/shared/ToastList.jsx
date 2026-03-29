import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast as BSToast } from 'bootstrap'; //由於bootstrap的Toast與套件名稱衝突，所以把bootstrap的Toast取個別名為 'BSToast'
import { removeMessage } from '@/features/toastSlice';

const TOAST_DURATION = 2000;
const statusClass = {
  success: 'toast-success',
  warning: 'toast-warning',
  error: 'toast-danger',
};
const statusText = {
  success: '成功',
  warning: '警告',
  error: '錯誤',
};

const ToastList = () => {
  // dispatch 是用來發送 actions 到 Redux store 的，讓我們可以修改 store 的狀態。
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.toast.messages);
  const toastRef = useRef({});

  const handleDismiss = (message_id) => {
    dispatch(removeMessage(message_id));
  };

  useEffect(() => {
    if (!messages.length) return;

    const timers = [];

    messages.forEach((message) => {
      const messageElement = toastRef.current[message.id];

      if (!messageElement) return;

      const toastInstance = BSToast.getOrCreateInstance(messageElement);
      toastInstance.show();

      const timer = setTimeout(() => {
        dispatch(removeMessage(message.id));
      }, TOAST_DURATION);

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [messages, dispatch]); // 將 dispatch 加入依賴陣列

  return (
    <>
      <div
        className="toast-container position-fixed top-0 start-50 translate-middle-x  p-3"
        style={{ zIndex: 1056 }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            ref={(el) => (toastRef.current[message.id] = el)}
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div
              className={`toast-header text-white ${statusClass[message.status]}`}
            >
              <strong className="me-auto"> {statusText[message.status]}</strong>
              <button
                onClick={() => handleDismiss(message.id)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">{message.text}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ToastList;
