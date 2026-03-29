import { useNavigate } from 'react-router-dom';

const Articles = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <h2>Articles - Page</h2>
      <p>此後台Articles頁面</p>
      <button onClick={() => navigate('/admin')}>回後台首頁</button>
    </div>
  );
};

export default Articles;
