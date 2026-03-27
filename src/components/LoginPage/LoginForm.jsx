import { Eye, EyeOff } from 'react-feather';
// import { useForm } from 'react-hook-form';

const LoginForm = ({
  handleLogin,
  handleInputChange,
  accountData,
  showLoginPassword,
  toggleLoginPassword,
  loginError,
  isScreenLoading,
  handleSwitchToRegister,
}) => {
  return (
    <>
      <div
        id="logindiv"
        className="ui-login d-flex flex-column justify-content-center align-items-center vh-50"
      >
        <h2 className="mb-4">會員登入</h2>
        {loginError && (
          <div className="ui-error-message alert alert-danger text-center mb-4">
            {loginError}
          </div>
        )}
        <form
          onSubmit={handleLogin}
          className={`d-flex flex-column gap-3 ${isScreenLoading ? 'opacity-50' : ''}`}
        >
          <div className="form-floating mb-3">
            <input
              id="email"
              name="email"
              type="email"
              value={accountData.email}
              onChange={handleInputChange}
              className="form-control"
              placeholder="example@test.com"
              required
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating ui-input-password ui-input-password--login">
            <input
              id="password"
              name="password"
              type={showLoginPassword ? 'text' : 'password'}
              value={accountData.password || ''}
              onChange={handleInputChange}
              className="form-control"
              placeholder="example"
              required
            />
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="ui-input-password__toggle"
              onClick={toggleLoginPassword}
            >
              {showLoginPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            className="btn ui-btn-primary"
            disabled={isScreenLoading}
          >
            {isScreenLoading ? '登入中...' : '登入'}
          </button>
        </form>
        <p className="mt-3 text-center">
          還沒有帳號？
          <button
            type="button"
            className="btn ui-btn-warning"
            onClick={handleSwitchToRegister}
          >
            註冊
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
