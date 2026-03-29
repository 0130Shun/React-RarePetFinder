import { useNavigate } from 'react-router-dom';

const Members = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <h2>Members - Page</h2>
      <p>此後台Members頁面</p>
      <button onClick={() => navigate('/admin')}>回後台首頁</button>
    </div>
  );
};

export default Members;
