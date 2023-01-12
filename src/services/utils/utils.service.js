import { floor, random } from 'lodash';
import { avatarColors } from '@services/utils/static.data';

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
}
