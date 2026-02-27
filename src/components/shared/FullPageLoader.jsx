import React from 'react';

const FullPageLoader = ({
  show = false,

  zIndex = 9999,
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
      <div className="ui-spinner" />
    </div>
  );
};

export default FullPageLoader;
