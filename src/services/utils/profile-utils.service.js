import { createSearchParams } from 'react-router-dom';

/**
 * Class ProfileUtils provide util function navigateToProfile
 */
export class ProfileUtils {
  /**
   * Navigate to the profile using the navigate hook and given data
   * @param {data} data
   * @param {Function} navigate
   */
  static navigateToProfile(data, navigate) {
    const url = `/app/social/profile/${data?.username}?${createSearchParams({ id: data?._id, uId: data?.uId })}`;
    navigate(url);
  }
}
