import cookies from './cookies';

export default class User {
  static store (user) {
    cookies.set('accesstoken', user.token, { path: '/' });
    cookies.set('user', user, { path: '/' });
  }
  static getCurrent() {
    const user = cookies.get('user');
    return user;
  }
  static getToken() {
    const token = cookies.get('accesstoken');
    return token;
  }
}