import useDetectOutsideClick from '@hooks/useDetectOutsideClick';
import { renderHook } from '@root/test.utils';
import { act } from 'react-dom/test-utils';

const windowAddEventListenerSpy = jest.spyOn(window, 'addEventListener');
const windowRemoveEventListenerSpy = jest.spyOn(window, 'removeEventListener');

const ref = { current: document.createElement('div') };

describe('useDetectOutsideClick', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // the initial state is a boolean
  it('should return initial state', () => {
    // this line set initial state to false
    const { result } = renderHook(() => useDetectOutsideClick(ref, false));
    const [isActive] = result.current;
    expect(isActive).toBeFalsy();
  });

  it('should update initial value', () => {
    const { result } = renderHook(() => useDetectOutsideClick(ref, false));
    const [isActive, setActive] = result.current;
    expect(isActive).toBeFalsy();
    // setActive will update initial value from false to true
    act(() => {
      setActive(true);
    });
    const [active] = result.current;
    expect(active).toBeTruthy();
  });

  it('should set value to false if true', async () => {
    // similar to previous test, setActive should update value to false
    const { result } = renderHook(() => useDetectOutsideClick(ref, true));
    const [, setActive] = result.current;
    act(() => {
      setActive(false);
    });
    const [isActive] = result.current;
    expect(isActive).toBeFalsy();
    expect(windowAddEventListenerSpy).toHaveBeenCalledTimes(1);
  });

  it('should remove listener when unmounted', async () => {
    const { unmount } = renderHook(() => useDetectOutsideClick(ref, false));
    unmount();
    expect(windowAddEventListenerSpy).toHaveBeenCalledTimes(0);
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
