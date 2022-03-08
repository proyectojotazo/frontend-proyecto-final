import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../client';

import storage from '../../utils/storage';

export const login = (data) => {
  const credentials = { email: data.email, password: data.password };
  return client.post('login', credentials).then(({ token }) => {
    setAuthorizationHeader(token);
    if (data.remember) {
      storage.set('auth', token);
    }
  });
};

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
