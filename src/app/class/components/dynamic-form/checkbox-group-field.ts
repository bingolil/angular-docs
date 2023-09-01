import { OptionItem } from 'src/app/interfaces/common/dynamic-form';
import { BasicField } from './basic-field';

export class CheckboxGroupField extends BasicField<any> {
  /** 控件类型：单选框组 */
  type? = 'checkboxGroup';

  /** 多选列表组 */
  options?: OptionItem[];

  constructor(options: CheckboxGroupField) {
    super(options);
    this.options = options.options || [];
  }
}
