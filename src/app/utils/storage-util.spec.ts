import { StorageUtil } from './storage-util';

describe('StorageUtil Test', () => {
  const localStorageMock = (function () {
    let store: { [key: string]: string } = {};
    return {
      getItem: function (key: string) {
        return store[key] || null;
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString();
      },
      removeItem: function (key: string) {
        delete store[key];
      },
      clear: function () {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  beforeEach(() => window.localStorage.clear());

  it('getLang static function', () => {
    const result = StorageUtil.getLang();
    expect(result).toEqual('zh-CN');
    expect(StorageUtil.getLang()).toEqual('zh-CN');
  });

  it('setLang static function', () => {
    StorageUtil.setLang('en-US');
    expect(StorageUtil.getLang()).toEqual('en-US');

    StorageUtil.setLang('zh-CN');
    expect(StorageUtil.getLang()).toEqual('zh-CN');
  });

  it('setToken static function', () => {
    StorageUtil.setToken('demo-token');
    expect(StorageUtil.getToken()).toEqual('demo-token');
  });

  it('getToken static function', () => {
    StorageUtil.getToken();
    expect(StorageUtil.getToken()).toBeNull();

    StorageUtil.setToken('demo-token');
    expect(StorageUtil.getToken()).toEqual('demo-token');
  });

  it('removeToken static function', () => {
    StorageUtil.setToken('demo-token');
    StorageUtil.removeToken();
    expect(StorageUtil.getToken()).toBeNull();
  });
});
