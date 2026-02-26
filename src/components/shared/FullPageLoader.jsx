import React from 'react';

const FullPageLoader = ({
  show = false,
  color = '#BC895D', // 奶茶棕 or 主色
  zIndex = 999,
}) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(255,255,255,0.4)',
        zIndex,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all', // 保證遮擋所有事件
      }}
      aria-busy="true"
      aria-label="Loading"
    >
      <div
        style={{
          width: '4rem',
          height: '4rem',
          border: `0.5rem solid #eee`,
          borderTop: `0.5rem solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      {/* inline style 的 keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FullPageLoader;
