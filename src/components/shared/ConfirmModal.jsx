import { useEffect } from 'react';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCancel();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!show) return null;

  return (
    <div className="ui-modal-overlay" onClick={onCancel}>
      <div className="ui-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ui-modal-header mb-2">
          <h5>{title}</h5>
        </div>

        <div className="ui-modal-bod mb-2">
          <p>{message}</p>
        </div>

        <div className="ui-modal-actions text-center">
          <button className="btn ui-btn-default me-2" onClick={onCancel}>
            取消
          </button>
          <button className="btn ui-btn-primary" onClick={onConfirm}>
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
