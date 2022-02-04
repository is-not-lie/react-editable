import type { ColDef } from 'ag-grid-community'
import type { ReactNode, ReactElement } from 'react'
import type {
  Option,
  NomalRecord,
  CascaderOption,
  AutoComplateOption,
  TreeData
} from '../index'
import type {
  AutoCompleteProps,
  CascaderProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  TreeSelectProps
} from 'antd'
import type { TextAreaProps } from 'antd/lib/input/TextArea'
import type { RangePickerProps } from 'antd/lib/date-picker'
import type { Rule } from './Rule'

export type CellIsEdit = boolean | ((record: NomalRecord, index: number) => boolean)
export type TransferRender = (params) => ReactNode
export type CellEditOnChange = (value: any, params, cache) => void
type Options<T> = T[] | ((params) => T[] | Promise<T[]>)

interface BasicColumns extends ColDef {
  title: ReactNode
  dataIndex: string
}

interface ReadonlyColumns extends BasicColumns {
  editable?: false
  render?(params): ReactNode
}

interface EditableBasicColumns extends BasicColumns {
  editable: true
  rule?: Rule[]
  onChange?: CellEditOnChange
  transferRender?: TransferRender
  isEdit?: CellIsEdit
  // fillDropdownConfig
}

export interface SelectEdit extends EditableBasicColumns {
  editType: 'select'
  options: Options<Option>
  configProps?: Omit<SelectProps<any>, 'options' | 'onChange'>
}

export interface TreeSelectEdit extends EditableBasicColumns {
  editType: 'treeSelect'
  options: Options<TreeData>
  configProps?: Omit<TreeSelectProps<any>, 'onChange' | 'treeData'>
}

interface SearchConfig {
  /**
   * @description 初始化时是否加载数据
   * @default false
   */
  initLoad?: boolean
  /**
   * @description 编辑过程中是否实时加载数据
   * @default true
   */
  editSearch?: boolean
  /**
   * @description 加载数据时是否使用 loading 图标替换 suffixIcon
   * @default true
   */
  replaceSuffix?: boolean
}
export interface SearchEdit extends EditableBasicColumns {
  editType: 'search'
  options: Options<Option | TreeData>
  searchConfig?: SearchConfig
  onSearch?(keyword: string, record: NomalRecord): (Option | TreeData)[] | Promise<(Option | TreeData)[]>
  configProps?: Omit<SelectProps<any>, 'onChange' | 'onSearch' | 'showSearch' | 'options'>
}

export interface InputEdit extends EditableBasicColumns {
  editType: 'input'
  configProps?: Omit<InputProps, 'onChange'>
}

export interface InputNumberEdit extends EditableBasicColumns {
  editType: 'inputNumber'
  configProps?: Omit<InputNumberProps, 'onChange' | 'min' | 'max'> & {
    min?: number | ((record: NomalRecord) => number)
    max?: number | ((record: NomalRecord) => number)
  }
}

export interface TextareaEdit extends EditableBasicColumns {
  editType: 'textarea'
  configProps?: Omit<TextAreaProps, 'onChange'>
}

export interface AutoCompleteEdit extends EditableBasicColumns {
  editType: 'autoComplete'
  options: Options<AutoComplateOption>
  onOptionsChange?(options: AutoComplateOption[]): void
  onSearch?(keyword: string, record: NomalRecord): AutoComplateOption[] | Promise<AutoComplateOption[]>
  completeType?: 'input' | 'textarea'
  configProps?: Omit<AutoCompleteProps, 'onChange'>
}

export interface CascaderEdit extends EditableBasicColumns {
  editType: 'cascader'
  options: Options<CascaderOption>
  configProps?: Omit<CascaderProps<any>, 'onChange' | 'options'>
}

interface CustomEdit extends EditableBasicColumns {
  editType: 'custom'
  renderEdit(params): ReactElement
}

export interface DateEdit extends EditableBasicColumns {
  editType: 'date'
  configProps?: Omit<DatePickerProps, 'onChange'>
}

export interface RangePickerEdit extends EditableBasicColumns {
  editType: 'rangePicker',
  configProps?: Omit<RangePickerProps, 'onChange'>
}

type BaseColumns = 
  | ReadonlyColumns
  | SelectEdit
  | TreeSelectEdit
  | SearchEdit
  | InputEdit
  | InputNumberEdit
  | TextareaEdit
  | AutoCompleteEdit
  | CascaderEdit
  | DateEdit
  | RangePickerEdit
  | CustomEdit

export type Columns = BaseColumns & { children?: BaseColumns[] }
