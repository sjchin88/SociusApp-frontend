import useEffectOnce from '@hooks/useEffectOnce';
import { renderHook } from '@root/test.utils';

describe('useEffectOnce', () => {
  it('should run provided effect only once', () => {
    const mockEffectCallback = jest.fn();
    // rerender is used to trigger the action
    const { rerender } = renderHook(() => useEffectOnce(mockEffectCallback));
    expect(mockEffectCallback).toHaveBeenCalledTimes(1);
    // despite second time rerender, the mock should be called once only
    rerender();
    expect(mockEffectCallback).toHaveBeenCalledTimes(1);
  });
});
