import { useEffect, useState } from 'react';
import '@components/sidebar/Sidebar.scss';
import { sideBarItems, fontAwesomeIcons } from '@services/utils/static.data';
import { useLocation, createSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Sidebar components, loop through the sidebar list to display the items
 * @returns the sidebar components created
 */
const Sidebar = () => {
  // useSelector to get the profile from the redux store state
  const { profile } = useSelector((state) => state.user);
  const [sidebar, setSideBar] = useState([]);
  // Get the current location
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Check the sidebar item name, return true if the name is in the location path
   */
  const checkUrl = (name) => {
    return location.pathname.includes(name.toLowerCase());
  };

  /**
   * Function to navigate to page based on user selection (click) on the sidebaritem
   * @param {String} name name of the item selected
   * @param {String} url url of the current page
   */
  const navigateToPage = (name, url) => {
    if (name === 'Profile') {
      url = `${url}/${profile?.username}?${createSearchParams({ id: profile?._id, uId: profile?.uId })}`;
    }

    navigate(url);
  };

  /**
   * Set sideBar component content equal to sideBarItems
   */
  useEffect(() => {
    setSideBar(sideBarItems);
  }, []);

  return (
    <div className="app-side-menu">
      <div className="side-menu">
        <ul className="list-unstyled">
          {sidebar.map((data) => (
            // data.index, data.name, data.url all declared inside sideBarItems
            <li key={data.index} onClick={() => navigateToPage(data.name, data.url)}>
              {/* if data.name exist the sidebar-link will display active button, else empty */}
              <div data-testid="sidebar-list" className={`sidebar-link ${checkUrl(data.name) ? 'active' : ''}`}>
                <div className="menu-icon">{fontAwesomeIcons[data.iconName]}</div>
                <div className="menu-link">
                  <span>{`${data.name}`}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
