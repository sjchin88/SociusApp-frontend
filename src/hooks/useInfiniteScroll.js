import { useEffect, useCallback } from 'react';

/**
 *
 * @param {*} bodyRef  main element which contain the scroll
 * @param {*} bottomLineRef ref point where we need to get new items from backend
 * @param {*} callback
 * @returns callback
 */
const useInfiniteScroll = (bodyRef, bottomLineRef, callback) => {
  const handleScroll = useCallback(() => {
    const containerHeight = bodyRef?.current?.getBoundingClientRect().height;
    // rename top to bottomLineTop
    const { top: bottomLineTop } = bottomLineRef?.current?.getBoundingClientRect();
    if (bottomLineTop <= containerHeight) {
      callback();
    }
  }, [bodyRef, bottomLineRef, callback]);

  useEffect(() => {
    const bodyRefCurrent = bodyRef?.current;
    bodyRefCurrent?.addEventListener('scroll', handleScroll, true);
    return () => bodyRefCurrent.removeEventListener('scroll', handleScroll, true);
  }, [bodyRef, handleScroll]);
};

export default useInfiniteScroll;
