import { createElement } from 'react'
import CellEdit from './CellEdit'
import type { Columns, NomalRecord } from '../typings'
import type { ReactNode } from 'react'
import type { InputRefChangeFn } from '../typings/Table/CellEditComp'
import { INDEX, IS_CHILD, IS_EXPANDED, IS_FULL, IS_SHOW_ARROW, LEVEL, orderNumConf, ORDER_NUM, PARENT_INDEX, PARENT_ROW_KEY, ROW_KEY, selectionConf } from './config'

type InputValueChangeFn = () => void

export const isDefArr = (target: any) =>
 !!(target && Array.isArray(target) && target.length)

const getHeaderTitle = (required: boolean, title: ReactNode) => {
  if (typeof title === 'string')
    return required
      ? () => createElement('div', { className: 'require-title' }, title)
      : undefined
  return title
}

const getColConf = (
  col: Columns,
  inputRefChange: InputRefChangeFn,
  inputValueChange: InputValueChangeFn
) => {
  const { editable } = col
  if (editable === true) {
    const { editType, isEdit = true, rule, title, onChange } = col
    const renderEdit = editType === 'custom' ? col.renderEdit : CellEdit
    const required = rule && rule.some(item => item.type === 'required')
    const configProps = editType === 'custom' ? undefined : col.configProps
    return {
      ...col,
      headerComponentFramework: getHeaderTitle(required, title),
      inputRefChange,
      onChange: (value, params, cache) => inputValueChange(),
      cellEditorFramework: renderEdit
    }
  }
  return { cellRendererFramework: col.render }
}

interface DeepPatch {
  curColumns: Columns[]
  oldColumns: Columns[]
  getColIdFn: (curDataIndex: string, oldDataIndex: string) => string
  inputRefChange: InputRefChangeFn
  inputValueChange: InputValueChangeFn
}
export const deepPatch = (config: DeepPatch) => {
  const {
    curColumns,
    oldColumns,
    getColIdFn,
    inputRefChange,
    inputValueChange
  } = config
  return curColumns.map((col, i) => {
    const {
      dataIndex,
      editable,
      children,
      field,
      pinned,
      title,
      width = 100,
      minWidth = 100
    } = col
    const { children: oChildren, dataIndex: oDataIndex } = oldColumns[i] || {}
    const colField = field || dataIndex
    const $children = children && deepPatch({
      curColumns: children,
      oldColumns: oChildren,
      getColIdFn,
      inputRefChange,
      inputValueChange
    })

    return {
      flex: pinned ? 0 : 1,
      headerName: title,
      field: colField,
      colId: colField + getColIdFn(dataIndex, oDataIndex),
      width,
      minWidth,
      editable,
      children: $children,
      ...getColConf(col, inputRefChange, inputValueChange)
    }
  })
}

export const random = () => Math.random().toString(36).substring(2)

export const sliceData = (data: NomalRecord[], page: number, size: number) => {
  const total = data.length
  const start = page * size
  const end = start + size > total
    ? total
    : start + size
  return data.slice(start, end)
}

interface MapSourceData {
  sourceData: NomalRecord[]
  dataMap: Map<string, NomalRecord>
  rowKey: string
  expanded: boolean
  expandedRowRender: boolean
}

export const mapSourceData = (params: MapSourceData) => {
  const {
    rowKey,
    dataMap,
    expanded,
    sourceData,
    expandedRowRender,
  } = params

  const deepMap = (
    list: NomalRecord[],
    pId: string = null,
    level = 0,
    pIndex = 0,
    pOrderNum?: string
  ) => {
    return list.map((item, index) => {
      const id = item[rowKey]
      const { children, ...arg } = item
      const isExpanded = dataMap.get(id)?.__isExpanded || expanded
      const isChild = !!pId
      const isFull = expandedRowRender && isChild
      const isShowArrow = expandedRowRender || isDefArr(children)
      const __index = index + 1
      const __orderNum = pOrderNum ? `${pOrderNum}-${__index}` : String(__index)
      const record = {
        ...arg,
        [IS_CHILD]: isChild,
        [ROW_KEY]: rowKey,
        [IS_EXPANDED]: isExpanded,
        [IS_FULL]: isFull,
        [IS_SHOW_ARROW]: isShowArrow,
        [ORDER_NUM]: __orderNum,
        [LEVEL]: level,
        [PARENT_ROW_KEY]: pId,
        [INDEX]: __index,
        [PARENT_INDEX]: pIndex
      }
      dataMap.set(id, record)
      if (isDefArr(children))
        Object.assign(record, {
          children: deepMap(children, id, level + 1, __index, __orderNum)
        })
      return record
    })
  }

  return deepMap(sourceData)
}

export const getFirstColumn = (
  canSelect: boolean,
  orderNum: boolean,
  selectType: 'checkbox' | 'radio'
) => {
  if (!canSelect && !orderNum) return []
  if (!canSelect && orderNum) return [orderNumConf]
  if (canSelect && !orderNum) return [{
    ...selectionConf,
    headerCheckboxSelection: selectType === "checkbox",
    checkboxSelection: canSelect,
  }]
  if (canSelect && orderNum) return [{
    ...selectionConf,
    ...orderNumConf,
    width: 70,
    minWidth: 70,
    maxWidth: undefined,
    headerCheckboxSelection: selectType === "checkbox",
    checkboxSelection: canSelect,
  }]
  return []
}
