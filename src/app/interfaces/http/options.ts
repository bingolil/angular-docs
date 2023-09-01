/** http请求参数 */
export interface HttpOptions {
  /** 请求地址 */
  url: string;
  /** post请求时参数 */
  data?: any;
  /** API请求是否展示loading动画 */
  loading?: boolean;
  /** API报错是否展示报错信息 */
  showErrorMsg?: boolean;
  /** 响应类型 */
  responseType?: 'json' | 'arraybuffer' | 'blob';
}
