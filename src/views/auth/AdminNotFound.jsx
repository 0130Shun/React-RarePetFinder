import { useNavigate } from 'react-router-dom';

const AdminNotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <h2>404 - Page Not Found</h2>
      <p>此後台頁面不存在</p>
      <button onClick={() => navigate('/admin')}>回後台首頁</button>
    </div>
  );
};

export default AdminNotFound;
