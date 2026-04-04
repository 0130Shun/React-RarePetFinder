import { useState } from 'react';
// components
import ConfirmModal from '@/components/shared/ConfirmModal';

// useConfirm = Hook + UI Controller 設計其實是「混合型」，
// 但是本質更偏向hook，可以繼續把UI或JS邏輯抽出
export const useConfirm = () => {
  const [config, setConfig] = useState(null);

  const confirm = ({ title, message, onConfirm }) => {
    setConfig({
      title,
      message,
      onConfirm,
    });
  };

  const handleConfirm = () => {
    config?.onConfirm?.();
    setConfig(null);
  };

  const handleCancel = () => {
    setConfig(null);
  };

  const ConfirmComponent = () =>
    config ? (
      <ConfirmModal
        show={true}
        title={config.title}
        message={config.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    ) : null;

  return { confirm, ConfirmComponent };
};
