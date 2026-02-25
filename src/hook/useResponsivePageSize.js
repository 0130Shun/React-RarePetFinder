import { useEffect, useState } from 'react';

// 讓手機版跟電腦版顯示的筆數不同
export default function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    const update = () => {
      setPageSize(window.innerWidth < 768 ? 8 : 9);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return pageSize;
}
