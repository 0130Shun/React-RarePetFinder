import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <>
      <div className="container ui-container mt-md-5">
        <h1>404 - Not Found</h1>
        <p>抱歉，您訪問的頁面不存在。</p>
        <p>請檢查網址是否正確，或返回首頁。</p>
        <Link to="/">回首頁</Link>
      </div>
    </>
  );
}
