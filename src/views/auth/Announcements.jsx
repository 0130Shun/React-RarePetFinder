import { useNavigate } from 'react-router-dom';

const Announcements = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <h2>Announcements - Page</h2>
      <p>此後台Announcements頁面</p>
      <button onClick={() => navigate('/admin')}>回後台首頁</button>
    </div>
  );
};

export default Announcements;
