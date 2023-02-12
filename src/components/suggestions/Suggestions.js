import '@components/suggestions/Suggestions.scss';
import Avatar from '@components/avatar/Avatar';
import Button from '@components/button/Button';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * Create the suggestion component
 * @returns the suggestion component
 */
const Suggestions = () => {
  // Get suggestions from redux store using useSelector
  const { suggestions } = useSelector((state) => state);
  // Define variable users and function to set users
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Set users value equals to suggestions?.users
  // everytime the dependencies property suggestions or users change
  useEffect(() => {
    setUsers(suggestions?.users);
  }, [suggestions, users]);

  return (
    <div className="suggestions-list-container" data-testid="suggestions-container">
      <div className="suggestions-header">
        <div className="title-text">Suggestions</div>
      </div>
      <hr />
      <div className="suggestions-container">
        <div className="suggestions">
          {/* need to fetch data from the redux store, which get the data from backend */}
          {users?.map((user, index) => (
            <div data-testid="suggestions-item" className="suggestions-item" key={index}>
              <Avatar
                name={user?.username}
                bgColor={user?.avatarColor}
                textColor="#ffffff"
                size={40}
                avatarSrc={user?.profilePicture}
              />
              <div className="title-text">{user?.username}</div>
              <div className="add-icon">
                <Button label="Follow" className="button follow" disabled={false} />
              </div>
            </div>
          ))}
        </div>
        {/* onClick call the function navigate to the page /app/social/people (page must exist) */}
        {users.length > 8 && (
          <div className="view-more" onClick={() => navigate('/app/social/people')}>
            View More
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
