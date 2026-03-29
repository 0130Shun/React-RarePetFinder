import { useNavigate } from 'react-router-dom';

const Stores = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <h2>Stores - Page</h2>
      <p>此後台Stores頁面</p>
      <button onClick={() => navigate('/admin')}>回後台首頁</button>
    </div>
  );
};

export default Stores;
