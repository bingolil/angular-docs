/** cookie工具 （读取，写入，删除） */
export class CookieUtil {

  /**
    document.cookie = "key=value; expires=string; path=/dir;domain=xx.com; max-age=3600; secure=true";

    key=value cookie的名称和值
    expires=string： expires，cookie过期的日期，如果没有定义，cookie会在对话结束时过期。日期格式为 new Date().toUTCString()
    path=/dir: path=path (例如 '/', '/dir') 如果没有定义，默认为当前文档位置的路径。
    domain=xx.com： 指定域(例如 'xx.com'， '.xx.com' (包括所有子域名), 'subdomain.xx.com') 如果没有定义，默认为当前文档位置的路径的域名部分。
    max-age=3600： 文档被查看后cookie过期时间，单位为秒
    secure=true： cookie只会被https传输 ，即加密的https链接传输
    */

  /**
   * @description 设置cookie
   * @param key cookie的唯一key
   * @param value cookie的value
   * @param days 多少天过期，undefined（会话结束就过期）
   */
  static setCookie(key: string, value: string, days?: number): void {
    let cookieStr = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    if (days !== undefined && days !== 0) {
      const invalidDate = new Date(days * 86400000 + new Date().getTime());
      cookieStr += ';expires=' + invalidDate.toUTCString();
    }
    document.cookie = cookieStr + ';path=/';
  }

  /**
   * @description 根据key获取cookie中对应value值
   * @param key cookie的唯一key
   * @returns string：当前key对应的value值，null当前cookie中未找到
   */
  static getCookie(key: string): string | null {
    const cookieReg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
    const result = document.cookie.match(cookieReg);
    return result ? decodeURIComponent(result[2]) : null;
  }

  /**
   * @description 根据key移除cookie中对应的value值
   * @param key 需要移除cookie的key
   */
  static removeCookie(key: string): void {
    const currentValue = this.getCookie(key);
    if (currentValue !== null) { // 当前cookie中存在对应key的value值
      this.setCookie(key, currentValue, -1)
    }
  }

}