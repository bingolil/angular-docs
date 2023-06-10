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

/** 字节大小单位 */
export const BYTE_UNITS = {
    B: 0, b: 0, K: 1, k: 1, KB: 1, kb: 1, M: 2, m: 2, MB: 2, mb: 2,
    G: 3, g: 3, GB: 3, gb: 3, T: 4, t: 4, TB: 4, tb: 4,
    P: 5, p: 5, PB: 5, pb: 5, E: 6, e: 6, EB: 6, eb: 6,
    Z: 7, z: 7, ZB: 7, zb: 7, Y: 8, y: 8, YB: 8, yb: 8
} as const;


/** 指定表格每页可以显示多少条列表 */
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

/** http请求状态码 */
export const ResultCode = {
    /** 正确的请求 */
    Ok: 200,
    /** 无权限，需进行身份验证 */
    NoPermission: 401,
    /** 未找到api地址 */
    NotFound: 404,
    /** 服务器错误 */
    BadServer: 500
} as const;

/** 正则表达式 */
export const REGEXP = {
    /** 邮件校验正则表达式 */
    email: /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/,
    /** 手机号码校验的正则表达式 */
    mobilePhone: /^1[3456789]\d{9}$/,
    /** 座机号码校验的正则表达式 */
    telephone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
    /** 银行卡号 */
    bankCard: /^[1-9]\d{9,19}$/,
    /** ip地址 */
    ip: /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
    /** QQ号码 */
    qq: /^[1-9]\d{4,11}$/,
    /** 网址, 仅支持http和https开头的 */
    url: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
    /** 通用的身份证号码校验的正则表达式 缺陷：存在02-31的日期；地址码没有16，26开头的地区 */
    IDCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
    /**  密码校验规则（由数字字母组成且长度大于8位） */
    password: /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]{8,}$/,
    /**  密码校验规则1（大写字母，小写字母数字组成且大于等于8位） */
    password1: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[\da-zA-Z]{8,}/,
    /** 密码校验规则2（必须包含数字、英文字母、特殊字符 ~!@#$%^&*且大于等于8位） */
    passowrd2: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/,
    /** （必须包含数字，大写字母，小写字母，特殊字符~!@#$%^&*且大于等于8位） */
    password3: /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[~!@#$%^&*]).*$/
} as const;
