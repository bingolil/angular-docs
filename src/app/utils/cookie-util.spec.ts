import { CookieUtil } from "./cookie-util";

describe('CookieUtil Test', () => {

  it('cookie static function', () => {
    CookieUtil.setCookie('name', 'tom');
    expect(CookieUtil.getCookie('name')).toEqual('tom');
    CookieUtil.removeCookie('name');
    expect(CookieUtil.getCookie('name')).toEqual(null);
  });

});
