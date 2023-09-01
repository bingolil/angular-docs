/** Option项详情 */
export interface OptionItem {
  /** 展示的值 */
  label: any;
  /** 绑定的值 */
  value: any;
  /** 当前值是否不可用 */
  disabled?: boolean;
  /** 其他属性 */
  [key: string]: any;
}
