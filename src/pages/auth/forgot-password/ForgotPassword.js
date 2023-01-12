import '@pages/auth/forgot-password/ForgotPassword.scss';
import { FaArrowLeft } from 'react-icons/fa';
import backgroundImage from '@assets/images/background.jpg';
import Input from '@components/input/Input';
import Button from '@components/button/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '@services/api/auth/auth.service';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const forgotPassword = async (event) => {
    setLoading(true);
    // prevent from reloading
    event.preventDefault();
    try {
      // pass in arguments as required by back end
      const response = await authService.forgotPassword(email);
      setLoading(false);
      setEmail('');
      console.log(response);
      setShowAlert(false);
      setAlertType('alert-success');
      setResponseMessage(response?.data?.message);
    } catch (error) {
      setLoading(false);
      setShowAlert(true);
      setAlertType('alert-error');
      setResponseMessage(error?.response?.data?.message);
    }
  };

  return (
    <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container-wrapper-auth">
        <div className="tabs forgot-password-tabs" style={{ height: `${responseMessage ? '300px' : ''} ` }}>
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {responseMessage && (
                  <div className={`alerts ${alertType}`} role="alert">
                    {responseMessage}
                  </div>
                )}
                <form className="auth-form" onSubmit={forgotPassword}>
                  <div className="form-input-container">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      labelText="Email"
                      placeholder="Enter Email"
                      style={{ border: `${showAlert ? '1px solid #fa9b8a' : ''}` }}
                      handleChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <Button
                    label={`${loading ? 'REQUEST RESET IN PROGRESS...' : 'REQUEST RESET'}`}
                    className="auth-button button"
                    disabled={!email}
                  />
                  <Link to={'/'}>
                    <span className="forgot-password">
                      Back to Login <FaArrowLeft className="arrow-left" />
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
