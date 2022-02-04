import type { NomalRecord } from '../index';
import type {
  InputEdit,
  TextareaEdit,
  AutoCompleteEdit
} from './Columns'

interface BasicProps<V> {
  value: V
  handleValueChange(value: V, extra?: NomalRecord): void
  width: string | number
  record: NomalRecord
  stopEditing(): void
}

export interface EditInputProps extends BasicProps<string> {
  configProps?: InputEdit['configProps']
}

export interface EditAutoCompleteProps extends BasicProps<string> {
  options: AutoCompleteEdit['options']
  completeType?: AutoCompleteEdit['completeType']
  configProps?: AutoCompleteEdit['configProps']
  onSearch?: AutoCompleteEdit['onSearch']
  onOptionsChange?: AutoCompleteEdit['onOptionsChange']
}
