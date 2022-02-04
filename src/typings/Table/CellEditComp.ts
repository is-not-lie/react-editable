import { ColumnApi, GridApi, RowNode } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import type { NomalRecord } from "../index";
import type { InputRef } from "../../Table/hooks";
import type {
  AutoCompleteEdit,
  CascaderEdit,
  DateEdit,
  InputEdit,
  InputNumberEdit,
  RangePickerEdit,
  SearchEdit,
  SelectEdit,
  TextareaEdit,
  TreeSelectEdit
} from "./Columns";

export type InputRefChangeFn = (ref: InputRef) => void

interface BasicColDef extends ColDef {
  inputRefChange: InputRefChangeFn
}

type InputCellEdit = InputEdit & BasicColDef
type SelectCellEdit = SelectEdit & BasicColDef
type TreeSelectCellEdit = TreeSelectEdit & BasicColDef
type SearchCellEdit = SearchEdit & BasicColDef
type InputNumberCellEdit = InputNumberEdit & BasicColDef
type TextareaCellEdit = TextareaEdit & BasicColDef
type AutoCompleteCellEdit = AutoCompleteEdit & BasicColDef
type CascaderCellEdit = CascaderEdit & BasicColDef
type DateCellEdit = DateEdit & BasicColDef
type RangePickerCellEdit = RangePickerEdit & BasicColDef
type CellEditColDef =
  | InputCellEdit
  | SelectCellEdit
  | TreeSelectCellEdit
  | SearchCellEdit
  | InputNumberCellEdit
  | TextareaCellEdit
  | AutoCompleteCellEdit
  | CascaderCellEdit
  | DateCellEdit
  | RangePickerCellEdit

export interface CellEditProps {
  value: any,
  stopEditing(): void,
  node: RowNode,
  colDef: CellEditColDef
  api: GridApi,
  columnApi: ColumnApi,
  eGridCell: HTMLDivElement,
  data: NomalRecord,
  rowIndex: number
}
