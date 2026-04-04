const FullPageLoader = ({ show = false, zIndex = 9999 }) => {
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

// import { useSelector } from 'react-redux';

// const FullPageLoader = ({ zIndex = 9999 }) => {
//   const isLoading = useSelector((state) => state.loading.fullPage);

//   // 透過 store 的 state.loading.fullPage判斷，如果 isLoading 為 false，則不渲染任何內容
//   if (!isLoading) return null;

//   return (
//     <>
//       <div
//         className="ui-fullpage-loader"
//         style={{ zIndex }}
//         role="status"
//         aria-live="polite"
//         aria-busy="true"
//       >
//         <div className="ui-spinner" />
//       </div>
//     </>
//   );
// };

// export default FullPageLoader;
