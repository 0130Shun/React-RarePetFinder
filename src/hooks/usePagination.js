import { useState, useMemo, useCallback } from 'react';

export const usePagination = (totalItems = 0, initialPageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  // 安全的目前頁碼（防止超過總頁數）
  const safeCurrentPage = useMemo(() => {
    return Math.min(Math.max(1, currentPage), totalPages);
  }, [currentPage, totalPages]);

  // 切換頁碼
  const goToPage = useCallback(
    (page) => {
      const targetPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(targetPage);
    },
    [totalPages]
  );

  // 下一頁
  const nextPage = useCallback(() => {
    if (safeCurrentPage < totalPages) {
      setCurrentPage(safeCurrentPage + 1);
    }
  }, [safeCurrentPage, totalPages]);

  // 上一頁
  const prevPage = useCallback(() => {
    if (safeCurrentPage > 1) {
      setCurrentPage(safeCurrentPage - 1);
    }
  }, [safeCurrentPage]);

  // 改變每頁顯示筆數（重點功能）
  const changePageSize = useCallback((newPageSize) => {
    if (newPageSize < 1) return;

    setPageSize(newPageSize);
    setCurrentPage(1); // ← 重要：改變每頁筆數時自動回到第 1 頁
  }, []);

  // 取得目前頁面的資料（client-side 分頁用）
  const getCurrentData = useCallback(
    (allData = []) => {
      if (!Array.isArray(allData) || allData.length === 0) return [];

      const start = (safeCurrentPage - 1) * pageSize;
      const end = start + pageSize;
      return allData.slice(start, end);
    },
    [safeCurrentPage, pageSize]
  );

  return {
    // 主要狀態
    currentPage: safeCurrentPage,
    totalPages,
    pageSize,

    // 操作方法
    goToPage,
    nextPage,
    prevPage,
    setPageSize: changePageSize, // ← 推薦使用這個（已內建回到第1頁）
    changePageSize, // 也可以直接用這個

    // 資料切割
    getCurrentData,

    // 方便判斷
    hasNext: safeCurrentPage < totalPages,
    hasPrev: safeCurrentPage > 1,
  };
};
