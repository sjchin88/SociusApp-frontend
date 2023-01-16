import reducer, { addUser, clearUser, updateUserProfile } from '@redux/reducers/user/user.reducer';

const initialState = {
  token: '',
  profile: null
};

describe('user reducer', () => {
  beforeEach(() => {
    initialState.token = '';
    initialState.profile = null;
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: '',
      profile: null
    });
  });

  it('should add user with token and profile', () => {
    expect(reducer(initialState, addUser({ token: '12345', profile: { username: 'Tyson' } }))).toEqual({
      token: '12345',
      profile: { username: 'Tyson' }
    });
  });

  it('should update user with profile', () => {
    initialState.token = '12345';
    initialState.profile = { username: 'Tyson' };
    expect(reducer(initialState, updateUserProfile({ username: 'Tylon' }))).toEqual({
      token: '12345',
      profile: { username: 'Tylon' }
    });
  });

  it('should clear token and user profile', () => {
    initialState.token = '12345';
    initialState.profile = { username: 'Tyson' };
    expect(reducer(initialState, clearUser())).toEqual({
      token: '',
      profile: null
    });
  });
});
