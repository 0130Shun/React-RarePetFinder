import { useState, useEffect } from 'react';

// services
import { adminService } from '@/services/adminService';
// components
import FullPageLoader from '@/components/shared/FullPageLoader';
import Article from '@/components/admin/ArticleModal';
// hook;
import { useToast } from '@/hooks/useToast';
// utils
import { extractErrorMessage } from '@/utils/errorHandler';
// constants
import { DEFAULT_ARTICLE } from '@/constants/adminDefaultData';

const Announcements = () => {
  const { showError } = useToast();
  const { getAnnouncements } = adminService;

  const [announcements, setAnnouncements] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  // 初次Stores列表載入
  useEffect(() => {
    const loadStores = async () => {
      setIsScreenLoading(true);

      try {
        const announcements = await getAnnouncements();
        setAnnouncements(announcements);
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error,
          null,
          '店家資料載入失敗，請稍後重新刷新。'
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
          <h2>公告 管理</h2>
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
                <th>公告編號</th>
                <th>公告標題</th>
                <th>公告類別</th>
                <th>公告是否置頂</th>
                <th>公告上架時間</th>
                <th>公告下架時間</th>
                <th>啟用狀態</th>
                <th>功能操作</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => {
                return (
                  <tr key={announcement.id}>
                    <td>{announcement.id}</td>
                    <td>{announcement.title}</td>
                    <td>
                      {announcement.type === 'alert' ? (
                        <span className="badge bg-danger">警示公告</span>
                      ) : (
                        <span className="badge bg-info">資訊公告</span>
                      )}
                    </td>
                    <td>{announcement.publishAt}</td>
                    <td>{announcement.unpublishAt}</td>
                    <td>
                      {announcement.isSticky ? (
                        <span className="badge bg-success">是</span>
                      ) : (
                        <span className="badge bg-secondary">否</span>
                      )}
                    </td>
                    <td>
                      {announcement.isActive ? (
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
                            handleOpenAnnouncementModal('edit', announcement);
                          }}
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button> */}
                        {/* <button
                            type="button"
                            onClick={() => {
                              handleOpenDeleteModal(announcement);
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

export default Announcements;
