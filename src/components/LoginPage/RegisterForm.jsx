import { Eye, EyeOff } from 'react-feather';

const RegisterForm = ({
  handleRegister,
  handleRegisterChange,
  registerData,
  showRegisterPassword,
  toggleRegisterPassword,
  registerError,
  isScreenLoading,
  handleSwitchToLogin,
}) => {
  return (
    <>
      <div
        id="register"
        className="ui-login d-flex flex-column justify-content-center align-items-center vh-50"
      >
        <h2 className="mb-4">註冊帳號</h2>
        {registerError && (
          <div className="ui-error-message alert alert-danger text-center mb-4">
            {registerError}
          </div>
        )}
        <form
          onSubmit={handleRegister}
          className={`d-flex flex-column gap-3 ${isScreenLoading ? 'opacity-50' : ''}`}
        >
          {/* userName */}
          <div className="form-floating">
            <input
              type="text"
              name="userName"
              value={registerData.userName}
              onChange={handleRegisterChange}
              className="form-control"
              placeholder="Your Name"
              required
            />
            <label>使用者名稱</label>
          </div>

          {/* email */}
          <div className="form-floating">
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="form-control"
              placeholder="example@mail.com"
              required
            />
            <label>Email</label>
          </div>

          {/* password */}
          <div className="form-floating ui-input-password ui-input-password--register">
            <input
              type={showRegisterPassword ? 'text' : 'password'}
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className="form-control"
              placeholder="password"
              required
            />
            <label>Password</label>
            <button
              type="button"
              className="ui-input-password__toggle"
              onClick={toggleRegisterPassword}
            >
              {showRegisterPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            className="btn ui-btn-warning"
            disabled={isScreenLoading}
          >
            {isScreenLoading ? '註冊中...' : '註冊'}
          </button>
        </form>
        <p className="mt-3 text-center">
          已經有帳號？
          <button
            type="button"
            className="btn ui-btn-primary"
            onClick={handleSwitchToLogin}
          >
            登入
          </button>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
