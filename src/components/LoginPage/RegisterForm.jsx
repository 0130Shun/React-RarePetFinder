import { Eye, EyeOff } from 'react-feather';

// utils
import { getPasswordStrength } from '@/utils/auth';

const RegisterForm = ({
  registerRegister,
  registerErrors,
  registerWatch,
  handleRegister,
  showRegisterPassword,
  toggleRegisterPassword,
  registerError,
  isScreenLoading,
  handleSwitchToLogin,
}) => {
  const passwordValue = registerWatch('password');
  const strength = getPasswordStrength(passwordValue);

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
              {...registerRegister('userName', {
                required: '請輸入 userName',
              })}
              className="form-control"
              placeholder="Your Name"
              required
            />
            <label htmlFor="userName">使用者名稱</label>
          </div>

          {/* email */}
          <div className="form-floating">
            <input
              type="email"
              name="email"
              {...registerRegister('email', {
                required: '請輸入 email',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email 格式錯誤',
                },
              })}
              className="form-control"
              placeholder="example@mail.com"
              required
            />
            {registerErrors.email && (
              <p className="ui-error-message mt-1">
                {registerErrors.email.message}
              </p>
            )}
            <label htmlFor="email">Email address</label>
          </div>

          {/* password */}
          <div className="form-floating ui-input-password ui-input-password--register">
            <input
              type={showRegisterPassword ? 'text' : 'password'}
              name="password"
              {...registerRegister('password', {
                required: '請輸入密碼',
                minLength: {
                  value: 6,
                  message: '密碼至少 6 碼',
                  // 英文大小寫+數字+長度(測試版先用6碼)
                  // value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
                  // message: '密碼至少 8碼 + 英文大小寫 + 數字',
                },
              })}
              className="form-control"
              placeholder="password"
              required
            />
            {registerErrors.password && (
              <p className="ui-error-message mt-1">
                {registerErrors.password.message}
              </p>
            )}
            <label htmlFor="password">password</label>
            <button
              type="button"
              className="ui-input-password__toggle"
              onClick={toggleRegisterPassword}
            >
              {showRegisterPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {passwordValue && (
            <div className="ui-password-strength">
              <div className={`bar ${strength}`}></div>
              <span className="label">
                {strength === 'weak' && '弱'}
                {strength === 'medium' && '中'}
                {strength === 'strong' && '強'}
              </span>
            </div>
          )}
          {/* keyin password again*/}
          <div className="form-floating ui-input-password ui-input-password--register">
            <input
              type={showRegisterPassword ? 'text' : 'password'}
              name="againPassword"
              {...registerRegister('confirmPassword', {
                required: '請再次輸入密碼',
                validate: (value) =>
                  value === registerWatch('password') || '兩次密碼不一致',
              })}
              className="form-control"
              placeholder="password"
              required
            />
            {registerErrors.confirmPassword && (
              <p className="ui-error-message mt-1">
                {registerErrors.confirmPassword.message}
              </p>
            )}
            <label htmlFor="againPassword">password again</label>
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
