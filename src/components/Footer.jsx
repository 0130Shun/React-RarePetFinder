import logo from '@/assets/logo.png';
import line from '@/assets/img/line.png';
import facebook from '@/assets/img/facebook.png';
import instagram from '@/assets/img/instagram.png';

function Footer() {
  return (
    <>
      <footer className="py-5">
        <div className="container ui-container">
          <div className="row align-items-center gy-4">
            <div className="col-md-6 text-center text-md-start">
              <div className="d-flex flex-column align-items-center align-items-md-start">
                <img src={logo} alt="稀寵搜搜" />
                <p className="text-secondary small mt-4 d-none d-md-block footer-disclaimer">
                  此網站僅做為作品練習，無營利用途
                </p>
              </div>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3">
                <a href="https://www.line.me/tw/" className="text-dark fs-3 ">
                  <img src={line} alt="line.png" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  className="text-dark fs-3 ms-3"
                >
                  <img src={facebook} alt="facebook.png" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  className="text-dark fs-3 ms-3"
                >
                  <img src={instagram} alt="instagram.png" />
                </a>
              </div>
              <div className="d-flex justify-content-center justify-content-md-end gap-4 fw-bold">
                <a
                  href="#"
                  className="footer-link text-decoration-none text-dark"
                >
                  聯絡我們
                </a>
                <a
                  href="#"
                  className="footer-link text-decoration-none text-dark"
                >
                  服務條款
                </a>
                <a
                  href="#"
                  className="footer-link text-decoration-none text-dark"
                >
                  隱私權政策
                </a>
              </div>
            </div>
            <div className="col-12 d-md-none text-center">
              <p className="text-secondary small mb-0 footer-disclaimer">
                此網站僅做為作品練習，無營利用途
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
