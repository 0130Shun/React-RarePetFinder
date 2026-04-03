import { useState, useEffect } from 'react';

// services
import { adminService } from '@/services/adminService';
// components
import FullPageLoader from '@/components/shared/FullPageLoader';
import Article from '@/components/admin/ArticleModal';
// hook;
import { useToast } from '@/hook/useToast';
// utils
import { extractErrorMessage } from '@/utils/errorHandler';
// constants
import { DEFAULT_ARTICLE } from '@/constants/adminDefaultData';

const Articles = () => {
  // const { showError, success } = useToast();
  const { showError } = useToast();
  // const { getArticles, createArticle, updateArticle } = adminService;
  const { getArticles } = adminService;

  // 狀態管理 (State)
  const [articles, setArticles] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  // 管理 Modal元件開關
  // const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  // Modal 錯誤訊息狀態
  // const [modalError, setModalError] = useState('');
  // 資料狀態
  // const [tempArticle, setTempArticle] = useState(DEFAULT_STORE);
  // const [modalMode, setModalMode] = useState(null);

  // 初次Stores列表載入
  useEffect(() => {
    const loadStores = async () => {
      setIsScreenLoading(true);

      try {
        const articles = await getArticles();
        setArticles(articles);
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error,
          null,
          '專文 資料載入失敗，請稍後重新刷新。'
        );
        showError(errorMessage);
      } finally {
        setIsScreenLoading(false);
      }
      setIsScreenLoading(false);
    };

    loadStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="admin-page">
        <div className="admin-card__header">
          <h2>專文 管理</h2>
          {/* <button
            className="btn btn-primary"
            onClick={() => {
              handleOpenArticleModal('create');
            }}
          >
          新增 專文
          </button> */}
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>專文編號</th>
                <th>專文標題</th>
                <th>專文類別</th>
                <th>作者</th>
                <th>專文上架時間</th>
                <th>專文下架時間</th>
                <th>啟用狀態</th>
                <th>功能操作</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                return (
                  <tr key={article.id}>
                    <td>{article.id}</td>
                    <td>{article.title}</td>
                    <td>{article.category}</td>
                    <td>{article.author}</td>
                    <td>{article.publishAt}</td>
                    <td>{article.unpublishAt}</td>
                    <td>
                      {article.isActive ? (
                        <span className="badge bg-success">啟用</span>
                      ) : (
                        <span className="badge bg-secondary">未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        {/* <button
                          type="button"
                          onClick={() => {
                            handleOpenArticleModal('edit', article);
                          }}
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button> */}
                        {/* <button
                            type="button"
                            onClick={() => {
                              handleOpenDeleteModal(article);
                            }}
                            className="btn btn-outline-danger btn-sm"
                          >
                            刪除
                          </button> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* ScreenLoading */}
      <FullPageLoader show={isScreenLoading} zIndex={2000} />
    </>
  );
};

export default Articles;
