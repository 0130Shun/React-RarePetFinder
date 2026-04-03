// import { useEffect, useState } from 'react';

import { AREA_OPTIONS, PET_TYPE_OPTIONS } from '@/constants/storeOptions';

const StoreModal = () => {
  // closing：用來控制「關閉動畫期間」是否保留 DOM
  // 當 isOpen 變成 false 時，我們不立刻卸載元件
  // 而是讓 closing = true，保留 300ms 給 fade-out 動畫
  // 動畫結束後才把 closing 設回 false，讓元件真正卸載
  // const [closing, setClosing] = useState(false);
  // 只要正在開啟（isOpen）或正在關閉動畫（closing），就保留 DOM
  // const shouldRender = isOpen || closing;

  // useEffect(() => {}, [isOpen, shouldRender]);

  // // 如果既沒有開啟，也沒有在 closing 動畫中 → 不渲染
  // if (!shouldRender) return null;

  return <></>;
};

export default StoreModal;
