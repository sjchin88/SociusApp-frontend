import axios from '@services/axios';

/**
 * Define API calls to perform UserService, available API include
 * getUserSuggestions
 */
class UserService {
  /**
   * Get a list of suggested users
   * @returns the HTTP response
   */
  async getUserSuggestions() {
    const response = await axios.get('/user/profile/user/suggestions');
    return response;
  }

  /**
   * Log out the user
   * @returns the HTTP response
   */
  async logoutUser() {
    const response = await axios.get('/signout');
    return response;
  }

  /**
   * Check if currentUser loggedin
   * @returns the HTTP response
   */
  async checkCurrentUser() {
    const response = await axios.get('/currentuser');
    return response;
  }
}

export const userService = new UserService();
