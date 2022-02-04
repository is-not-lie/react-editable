export const SELECT = '__select'
export const ORDER_NUM = '__orderNum'
export const INDEX = '__index'
export const IS_SHOW_ARROW = '__isShowArrow'
export const IS_EXPANDED = '__isExpanded'
export const ROW_KEY = '__rowKey'
export const IS_CHILD = '__isChild'
export const IS_FULL = '__isFull'
export const LEVEL = '__level'
export const PARENT_ROW_KEY = '__parentRowKey'
export const PARENT_INDEX = '__parentIndex'

export const selectionConf = {
  headerName: '',
  field: SELECT,
  width: 35,
  maxWidth: 35,
  minWidth: 35,
  pinned: 'left',
  sortable: false,
}

export const orderNumConf = {
  headerName: "序号",
  field: ORDER_NUM,
  width: 50,
  minWidth: 50,
  pinned: "left",
  sortable: false,
  suppressMovable: true,
  cellRenderer: "renderOrderNum",
}
