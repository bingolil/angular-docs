/** http请求返回接口 */
export interface Result<T> {
  /** 状态码 */
  code: number;
  /** 信息 */
  msg: string;
  /** 返回数据 */
  data: T;
}