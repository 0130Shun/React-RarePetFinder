import { Eye, EyeOff } from 'react-feather';

// utils
import { getPasswordStrength } from '@/utils/auth';

const LoginForm = ({
  register,
  errors,
  watch,
  handleLogin,
  showLoginPassword,
  toggleLoginPassword,
  loginError,
  isScreenLoading,
  handleSwitchToRegister,
}) => {
  const passwordValue = watch('password');
  const strength = getPasswordStrength(passwordValue);

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
              // value={accountData.email}
              // onChange={handleInputChange}
              {...register('email', {
                required: '請輸入 email',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email 格式錯誤',
                },
              })}
              className="form-control"
              placeholder="example@test.com"
              required
            />
            {errors.email && (
              <p className="ui-error-message mt-1">{errors.email.message}</p>
            )}
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating ui-input-password ui-input-password--login">
            <input
              id="password"
              name="password"
              type={showLoginPassword ? 'text' : 'password'}
              {...register('password', {
                required: '請輸入密碼',
                minLength: {
                  value: 6,
                  message: '密碼至少 6 碼',
                },
              })}
              className="form-control"
              placeholder="example"
              required
            />

            {errors.password && (
              <p className="ui-error-message mt-1">{errors.password.message}</p>
            )}
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="ui-input-password__toggle"
              onClick={toggleLoginPassword}
            >
              {showLoginPassword ? <EyeOff /> : <Eye />}
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
