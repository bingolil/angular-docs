/** 定义语言常量 */
export const LANG = {
    /** 中文 */
    zhCn: 'zh-CN',
    /** 英文 */
    enUs: 'en-US'
} as const;

/** 定义表格常量 */
export const PAGE = {
    /** 表格页码 */
    pageNum: 1,
    /** 每页展示条数 */
    pageSize: 10
};

/** 指定表格每页可以显示多少条列表 */
export const PAGE_SIZE_OPTIONS = [10, 20, 30, 50];

/** http请求状态码 */
export const ResultCode = {
    /** 正确的请求 */
    Ok: 200,
    /** 无权限，需进行身份验证 */
    NoPermission: 401,
    /** 未找到api地址 */
    NotFound: 404
} as const;