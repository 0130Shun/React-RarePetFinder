import React from 'react';

const FullPageLoader = ({
  show = false,
  color = '#fec631',
  zIndex = 9999,
  size = 64,
}) => {
  if (!show) return null;

  return (
    <div
      className="ui-fullpage-loader"
      style={{ zIndex }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="ui-spinner"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      />
    </div>
  );
};

export default FullPageLoader;
