import Input from '@components/input/Input';
import Button from '@components/button/Button';
import '@pages/auth/register/Register.scss';
import { useState, useEffect } from 'react';
import { Utils } from '@services/utils/utils.service';
import { authService } from '@services/api/auth/auth.service';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState();
  const [setStoredUsername] = useLocalStorage('username', 'set');
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
  const [pageReload] = useSessionStorage('pageReload', 'set');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // event will be coming from the page
  const registerUser = async (event) => {
    setLoading(true);
    // prevent from reloading
    event.preventDefault();
    try {
      const avatarColor = Utils.avatarColor();
      const avatarImage = Utils.generateAvatar(username.charAt(0).toUpperCase(), avatarColor);
      // pass in arguments as required by back end
      const result = await authService.signUp({
        username,
        email,
        password,
        avatarColor,
        avatarImage
      });
      // set logged in to true in local storage
      setLoggedIn(true);
      // store username in local storage
      setStoredUsername(username);
      // dispatch user to redux
      // console.log(result);
      setHasError(false);
      setAlertType('alert-success');
      Utils.dispatchUser(result, pageReload, dispatch, setUser);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (loading && !user) return;
    if (user) {
      navigate('/app/social/streams');
    }
  }, [loading, user, navigate]);

  return (
    <div className="auth-inner">
      {hasError && errorMessage && (
        <div className={`alerts ${alertType}`} role="alert">
          {errorMessage}
        </div>
      )}
      <form className="auth-form" onSubmit={registerUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeholder="Enter Username"
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setUsername(event.target.value)}
          />
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            labelText="Email"
            placeholder="Enter Email"
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setEmail(event.target.value)}
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            labelText="Password"
            placeholder="Enter Password"
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          label={`${loading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'}`}
          className="auth-button button"
          disabled={!username || !email || !password}
        />
      </form>
    </div>
  );
};

export default Register;
