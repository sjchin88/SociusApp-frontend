import Suggestions from '@components/suggestions/Suggestions';
import '@pages/social/streams/Streams.scss';
import { getUserSuggestions } from '@redux/api/suggestion';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useEffectOnce from '@hooks/useEffectOnce';

/**
 * Create the stream component
 * @returns the stream component created
 */
const Streams = () => {
  const bodyRef = useRef(null);
  const bottomLineRef = useRef();
  const dispatch = useDispatch();

  // call the getUserSuggestions function
  useEffectOnce(() => {
    dispatch(getUserSuggestions());
  });

  return (
    <div className="streams" data-testid="streams">
      <div className="streams-content">
        <div className="streams-post" ref={bodyRef}>
          <div>Post Form</div>
          <div>Posts Items</div>
          {/* this div is for pagination, and also used in infinite scroll as reference */}
          <div ref={bottomLineRef} style={{ marginBottom: '50px', height: '50px' }}></div>
        </div>
        <div className="streams-suggestions">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Streams;
