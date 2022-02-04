import type { GridReadyEvent } from 'ag-grid-community'
import type { AgGridReactProps } from 'ag-grid-react'
import type { PaginationProps } from 'antd'
import type { CSSProperties, ReactElement } from 'react'
import type { NomalRecord } from '../index'
import type { Columns } from './Columns'

export interface EditTableProps {
  /**
   * @description 表格容器的类名
   */
  className?: string
  /**
   * @description 表格容器的样式
   */
  style?: CSSProperties
  /**
   * @description 是否开启列宽自适应
   * @default true
   */
  autoSize?: boolean
  /**
   * @description 列配置
   */
  columns: Columns[]
  /**
   * @description 表格数据源
   */
  data: NomalRecord[]
  /**
   * @description 是否显示序号
   * @default true
   */
  orderNum?: boolean
  /**
   * @description 行的唯一标识
   * @default id
   */
  rowKey?: string
  /** 
   * @description 是否可选择
   * @default false
   */
  canSelect?: boolean
  /**
   * @description 选择类型 (多选 | 单选)
   * @default checkbox
   */
  selectType?: 'checkbox' | 'radio'
  /**
   * @description 是否支持跨页选择
   * @default false
   */
  multiSelect?: boolean
  /**
   * @description 选择时触发回调
   */
  onSelect?(
    record: NomalRecord,
    selected: boolean,
    selecteds: string[],
    selectedRows: NomalRecord[]
  ): void
  /**
   * @description 是否开启分页
   * @default true
  */
  pagination?: boolean
  /**
   * @description 分页器配置, 开启分页时生效 (无需维护 pageNumber 和 pageSize)
   */
  paginationConfig?: PaginationProps
  /**
   * @description 传给 ag 表格的配置
   */
  agConfig?: AgGridReactProps
  onInit?(event: GridReadyEvent): void
  defaultExpanded?: boolean
  expandedRowRender?(params): ReactElement
}

export type {
  Columns
}
