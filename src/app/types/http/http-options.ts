/** http请求参数 */
export interface HttpOptions {
    /** 请求方法 */
    method?: string
    /** 请求地址 */
    url: string;
    /** API请求是否展示loading动画 */
    loading?: boolean;
    /** 响应类型 */
    responseType?: 'json' | 'arraybuffer' | 'blob';
    
}
