import { LANG } from "../constant";

/** 定义valueof */
type valueof<T> = T[keyof T];

/** 语言对象的值组成的类型（对象为不可变 object as const，不然返回为值类型） */
export type langValueType = valueof<typeof LANG>;

/** 语言对象的属性key组成的类型 */
export type langKeyType = keyof typeof LANG;