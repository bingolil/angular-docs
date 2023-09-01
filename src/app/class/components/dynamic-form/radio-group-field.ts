import { OptionItem } from 'src/app/interfaces/common/dynamic-form';
import { BasicField } from './basic-field';

export class RadioGroupField extends BasicField<any> {
  /** 控件类型：单选框组 */
  type? = 'radioGroup';

  /** 单选列表组 */
  options?: OptionItem[];

  constructor(options: RadioGroupField) {
    super(options);
    this.options = options.options || [];
  }
}
