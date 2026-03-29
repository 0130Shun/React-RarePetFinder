const Dashboard = () => {
  return (
    <div className="admin-page">
      {/* ===================== */}
      {/* 1️⃣ 統計區 */}
      {/* ===================== */}
      <div className="admin-grid mb-4">
        <div className="admin-stat">
          <div>
            <div className="admin-stat__title">訂單數</div>
            <div className="admin-stat__value">128</div>
          </div>
        </div>

        <div className="admin-stat">
          <div>
            <div className="admin-stat__title">營收</div>
            <div className="admin-stat__value">$12,300</div>
          </div>
        </div>

        <div className="admin-stat">
          <div>
            <div className="admin-stat__title">會員數</div>
            <div className="admin-stat__value">56</div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* 2️⃣ 訂單 Table */}
      {/* ===================== */}
      <div className="admin-card mb-4">
        <div className="admin-card__header">最近訂單</div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>客戶</th>
                <th>金額</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>王小明</td>
                <td>$300</td>
                <td>已完成</td>
              </tr>
              <tr>
                <td>#002</td>
                <td>李小美</td>
                <td>$520</td>
                <td>處理中</td>
              </tr>
              <tr>
                <td>#003</td>
                <td>陳先生</td>
                <td>$180</td>
                <td>已取消</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================== */}
      {/* 3️⃣ 最近活動（Card list） */}
      {/* ===================== */}
      <div className="admin-card mb-4">
        <div className="admin-card__header">最近活動</div>

        <div className="admin-card__body">
          <ul>
            <li>新增商品：精品咖啡豆</li>
            <li>會員註冊：user123</li>
            <li>訂單完成：#001</li>
          </ul>
        </div>
      </div>

      {/* ===================== */}
      {/* 4️⃣ 商品卡片（3x3 Grid） */}
      {/* ===================== */}
      <div className="admin-card">
        <div className="admin-card__header">熱門商品</div>

        <div className="admin-grid">
          {[...Array(6)].map((_, i) => (
            <div className="admin-card" key={i}>
              <div className="admin-card__body">
                <div
                  style={{
                    height: '100px',
                    background: '#eee',
                    marginBottom: '10px',
                  }}
                />
                <div>商品名稱 {i + 1}</div>
                <div>$ {100 + i * 50}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
