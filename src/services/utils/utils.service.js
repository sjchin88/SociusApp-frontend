import { floor, random } from 'lodash';
import { avatarColors } from '@services/utils/static.data';
import { addUser, clearUser } from '@redux/reducers/user/user.reducer';

/**
 * Utils class contains helper methods
 */
export class Utils {
  static avatarColor() {
    // return the random index of an avatar color
    return avatarColors[floor(random(0.9) * avatarColors.length)];
  }

  /**
   * Generate an avatar image based on given input
   * @param {*} text name of the user
   * @param {*} backgroundColor background color should be same as avatar color
   * @param {*} foregroundColor color for the text, default is white
   */
  static generateAvatar(text, backgroundColor, foregroundColor = 'white') {
    // build a canvas using javascript
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    context.fillStype = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = 'normal 80px sans-serif';
    context.fillStyle = foregroundColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL('image/png');
  }

  /**
   * Function
   * @param {*} result result to be returned
   * @param {*} pageReload function to set data to the session
   * @param {*} dispatch function dispatch action
   * @param {*} setUser set user to the state
   */
  static dispatchUser(result, pageReload, dispatch, setUser) {
    pageReload(true);
    // call the action addUser, the passed in arguments need to be same as
    // provided by backend
    dispatch(addUser({ token: result.data.token, profile: result.data.user }));
    setUser(result.data.user);
  }

  /**
   * Function to clear the redux store
   * @param {Object} param0 include functions : dispatch, deleteStorageUsername, deleteSessionPageReload, and setLoggedIn
   */
  static clearStore({ dispatch, deleteStorageUsername, deleteSessionPageReload, setLoggedIn }) {
    dispatch(clearUser());
    // dispatch clear notification action
    deleteStorageUsername();
    deleteSessionPageReload();
    setLoggedIn(false);
  }

  /**
   * Simple function to return the value of app environment
   * @returns string value of app environment
   */
  static appEnvironment() {
    const env = process.env.REACT_APP_ENVIRONMENT;
    if (env === 'development') {
      return 'DEV';
    } else if (env === 'staging') {
      return 'STG';
    }
  }

  static generateString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Function to map the setting text to setting dropdown menu
   * @param {*} setSettings function to set the settings
   */
  static mapSettingsDropdownItems(setSettings) {
    const items = [];
    const item = {
      topText: 'My Profile',
      subText: 'View personal profile.'
    };
    items.push(item);
    setSettings(items);
    return items;
  }
}
