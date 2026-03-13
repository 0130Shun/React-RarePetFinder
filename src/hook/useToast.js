import { useDispatch } from 'react-redux';
import { pushMessage } from '@/features/toast/toastSlice';

export const useToast = () => {
  const dispatch = useDispatch();

  const success = (text) => {
    dispatch(
      pushMessage({
        text,
        status: 'success',
      }),
    );
  };

  const showError = (text) => {
    dispatch(
      pushMessage({
        text,
        status: 'error',
      }),
    );
  };

  const warning = (text) => {
    dispatch(
      pushMessage({
        text,
        status: 'warning',
      }),
    );
  };

  return {
    success,
    showError,
    warning,
  };
};
