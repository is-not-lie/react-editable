import type { CSSProperties, ComponentType, ReactNode } from 'react'
import type { Rule } from 'rc-field-form/lib/interface'
import type {
  InputNumberProps,
  InputProps,
  AutoCompleteProps,
  CascaderProps,
  CheckboxProps,
  DatePickerProps,
  MentionProps,
  SelectProps,
  TreeSelectProps,
  SwitchProps,
  FormProps as AntdFormProps,
  RowProps,
  RadioGroupProps
} from 'antd'
import type { TextAreaProps } from 'antd/lib/input/TextArea'
import type { PasswordProps } from 'antd/lib/input/Password'
import type { SearchProps } from 'antd/lib/input/Search'
import type {
  MonthPickerProps,
  WeekPickerProps,
  RangePickerProps
} from 'antd/lib/date-picker'
import type { NomalRecord } from './index'

interface WeekDateConfig extends Omit<WeekPickerProps, 'onChange'> {
  picker: 'week'
}
interface MonthDateConfig extends Omit<MonthPickerProps, 'onChange'> {
  picker: 'month',
}
interface QuarterDateConfig extends Omit<MonthPickerProps, 'onChange' | 'monthCellRender'>{
  picker: 'quarter'
}
interface YearDateConfig extends Omit<MonthPickerProps, 'onChange' | 'monthCellRender'> {
  picker: 'year',
}

export type DateConfig =
  | WeekDateConfig
  | MonthDateConfig
  | QuarterDateConfig
  | YearDateConfig

export type Direction = 'vertical' | 'horizontal'
export type Size = 'large' | 'middle' | 'small'
export interface Option<V = string | number> extends NomalRecord {
  key: V
  label: string
  disabled?: boolean
}
export interface CascaderOption extends Omit<Option, 'label'> {
  label: ReactNode
  children?: CascaderOption[]
}
export interface AutoComplateOption extends Omit<Option, 'label'> {
  label: ReactNode
}
export interface CheckboxOptions extends Option {
  /** 默认是否选中 */
  defaultChecked?: boolean
  /** 指定当前是否选中 (受控) */
  checked?: boolean
}
export interface SelectOption<V = string | number> extends Option<V> {
  customLabelRender?(option: SelectOption<V>): ReactNode
  group?: SelectOption<V>[]
}
export interface TreeData extends Option {
  children?: TreeData[],
  /** 禁用 Checkbox */
  disableCheckbox?: boolean
  /** 是否可选 */
  selectable?: boolean
  /** 设置独立节点是否展示 Checkbox (treeCheckable 为 true 时生效)*/
  checkable?: boolean
  /** 是否子节点 */
  isLeaf?: boolean
}

// type InputOnChange = (value: string | number) => void
// type selectOnChange = (
//   value: string | number | (string | number)[],
//   option?: SelectOption | SelectOption[]
// ) => void

interface BaseFormItem {
  key: string
  label: ReactNode
  size?: Size
  /** 表单开启 flex 布局时生效, 控制表单项的 flex 属性 */
  flex?: string | number
  /** 排序 */
  sortOrder?: number
  /** 传给 Antd Form.Item 组件的 className 和 style */
  className?: string
  style?: CSSProperties
  /** 不渲染 Form.Item */
  noRenderFormItem?: true
  /** 展示必填 * 号 */
  required?: boolean
  /** 校验规则 */
  rules?: Rule[]
  col?: number
  offset?: number
  labelCol?: number
  wrapperCol?: number
  labelLeft?: boolean
  labelInPlaceholder?: boolean
}

interface InputFormItem extends BaseFormItem {
  type: 'input',
  // onChange?: InputOnChange
  configProps?: Omit<InputProps, 'onChange' | 'onInput'>
}

interface InputNumberFormItem extends BaseFormItem {
  type: 'inputNumber'
  // onChange?: InputOnChange
  configProps?: Omit<InputNumberProps, 'onChange' | 'onInput'>
}

interface PasswordFormItem extends BaseFormItem {
  type: 'password'
  // onChange?: InputOnChange
  configProps?: Omit<PasswordProps, 'onChange' | 'onInput'>
}

interface SearchFormItem extends BaseFormItem {
  type: 'search'
  // onChange?: InputOnChange
  configProps?: Omit<SearchProps, 'onChange' | 'onInput'>
}

interface TextAreaFormItem extends BaseFormItem {
  type: 'textarea'
  // onChange?: InputOnChange
  configProps?: Omit<TextAreaProps, 'onChange' | 'onInput'>
}

interface DateFormItem extends BaseFormItem {
  type: 'date'
  dateConfig?: DateConfig
  // onChange?(value: number): void
  configProps?: Omit<DatePickerProps, 'onChange' | 'picker'>
}
// type PanelMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade'
export interface RangeDateFormItem extends BaseFormItem {
  type: 'rangeDate',
  // onChange?(value: number[]): void
  configProps?: Omit<DatePickerProps, 'onChange' | 'picker' | 'mode' | 'value' | 'defaultValue' | 'defaultPickerValue' | 'onPanelChange' | 'placeholder' | 'onOk'> & Omit<RangePickerProps, 'onChange'>
}

interface RadioFormItem extends BaseFormItem {
  type: 'radio'
  options: Option[]
  direction?: Direction
  // onChange?: selectOnChange
  configProps?: Omit<RadioGroupProps, 'onChange' | 'options'>
}

export type CheckboxOmitProp =
  | 'onChange' | 'disabled' | 'defaultChecked' | 'checked'
export interface CheckboxFormItem extends Omit<BaseFormItem, 'onChange'> {
  type: 'checkbox'
  options: CheckboxOptions[]
  direction?: Direction
  /** 是否整组禁用 (将会覆盖 options 里的 disabled) */
  disabledGroup?: boolean
  // onChange?(value: CheckboxOptions['value'][], option?: CheckboxOptions[]): void
  configProps?: Omit<CheckboxProps, CheckboxOmitProp>
}

interface AutoComplateFormItem extends BaseFormItem {
  type: 'autoComplate'
  // onChange?(value: string, option?: Omit<AutoComplateOption, 'label'>): void
  options: AutoComplateOption[]
  configProps?: Omit<AutoCompleteProps, 'onChange' | 'options'>
}

interface CascaderFormItem extends BaseFormItem {
  type: 'cascader'
  options: CascaderOption[]
  // onChange?(value: Key | Key[], option?: NomalRecord[] | NomalRecord[][]): void
  configProps?: Omit<CascaderProps<any>, 'onChange' | 'options'>
}

interface MentionsFormItem extends BaseFormItem {
  type: 'mentions'
  /** 触发条件, 默认 @ 符 */
  prefix?: string | string[]
  options: Option<string>[]
  // onChange?: selectOnChange
  configProps?: Omit<MentionProps, 'onChange' | 'prefix'>
}

interface SelectFormItem<V> extends BaseFormItem {
  type: 'select'
  options: SelectOption[]
  // onChange?: selectOnChange
  configProps?: Omit<SelectProps<V>, 'onChange' | 'options'>
}

interface TreeSelectFormItem<V> extends BaseFormItem {
  type: 'treeSelect'
  data: TreeData[]
  // onChange?(value: string | number | (string | number)[], option?: TreeData): void
  configProps?: Omit<TreeSelectProps<V>, 'onChange' | 'treeData' | 'fieldNames'>
}

interface SwitchFormItem extends BaseFormItem {
  type: 'switch'
  // onChange?(isChecked: boolean): void
  configProps?: Omit<SwitchProps, 'onChange'>
}

interface CustomFormItem extends BaseFormItem {
  type: 'custom'
  customRender(props?: NomalRecord): ReactNode
  configProps?: NomalRecord
}

interface CustomCompFormItem extends BaseFormItem {
  type: 'customComp'
  comp: ComponentType
  configProps?: NomalRecord
}

export type FormItem =
  | InputFormItem
  | InputNumberFormItem
  | PasswordFormItem
  | SearchFormItem
  | TextAreaFormItem
  | DateFormItem
  | RangeDateFormItem
  | RadioFormItem
  | CheckboxFormItem
  | AutoComplateFormItem
  | CascaderFormItem
  | MentionsFormItem
  | SelectFormItem<any>
  | TreeSelectFormItem<any>
  | SwitchFormItem
  | CustomFormItem
  | CustomCompFormItem

interface DefaultLayout { col?: number; wrapperCol?: number; labelCol?: number }

export interface FormProps {
  formKey: string;
  className?: string;
  /** 表单控件尺寸, 默认: small */
  defaultSize?: 'large' | 'middle' | 'small'
  /** 表单布局格式 */
  layout?: AntdFormProps['layout']
  /** flex 配置 */
  flexConfig?: RowProps;
  /** 表单项配置 */
  formItems: FormItem[];
  /** 表单默认值 */
  initialValue?: AntdFormProps['initialValues'];
  /** 表单默认布局 */
  defaultLayout?: DefaultLayout;
  /** 是否开启 proxy 模式, 需搭配 useProxy 使用 */
  proxy?: boolean;
  /** 表单项 change 事件 */
  onChange?(field: string, value: any, option?: any): void;
  /** 表单提交成功时回调 */
  onFinish?(formValue: NomalRecord): void;
  /** 表单提交失败时回调 */
  onFinishError?: AntdFormProps['onFinishFailed']
}
