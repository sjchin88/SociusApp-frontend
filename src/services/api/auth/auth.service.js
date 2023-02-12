import axios from '@services/axios';

/**
 * Define API calls to perform AuthService, available API include
 * signUp, signIn, forgotPassword, resetPassword
 */
class AuthService {
  /**
   * register the user
   * @param {JSON} body contain registration information, need to have username, email, password, avatarColor and avatarImage in the req.body
   * @returns HTTP response that include user data for cache and also jwt token
   */
  async signUp(body) {
    const response = await axios.post('/signup', body);
    return response;
  }

  /**
   * Allow user to login
   * @param {JSON} body contain login data, need to have username, password in the req.body
   * @returns HTTP response that include user data for cache and also jwt token
   */
  async signIn(body) {
    const response = await axios.post('/signin', body);
    return response;
  }

  /**
   * Allow user to request for password reset link
   * @param {String} email email account of user
   * @returns HTTP response of HTTP status code only
   */
  async forgotPassword(email) {
    const response = await axios.post('/forgot-password', { email });
    return response;
  }

  /**
   * Allow user to reset the password
   * @param {String} token reset token
   * @param {JSON} body need to contain password and confirmpassword inside req.body
   * @returns HTTP response contain HTTP status code only
   */
  async resetPassword(token, body) {
    const response = await axios.post(`/reset-password/${token}`, body);
    return response;
  }
}

export const authService = new AuthService();
