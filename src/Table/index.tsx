import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback
} from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColumnApi, GridApi, RowNode } from 'ag-grid-community'
import { debounce, difference } from 'lodash'
import { deepPatch, getFirstColumn, isDefArr, mapSourceData, sliceData } from './tool'
import { useGetColIdFn, useInputRef } from './hooks'

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import './index.scss'

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community'
import type { Columns, EditTableProps, NomalRecord } from '../typings'
import { Empty, Pagination, Spin } from 'antd'
import OrderNum from './OrderNum'
import { INDEX, IS_CHILD, IS_EXPANDED, PARENT_INDEX } from './config'

const CustomLoading = () => <Spin spinning={true} />
const CustomNotFound = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

const EditTable: ForwardRefRenderFunction<EditTableRef, EditTableProps> = (props, ref) => {
  const {
    className,
    orderNum = true,
    data: sourceData,
    columns: propColumns,
    rowKey = 'id',
    canSelect = false,
    selectType = 'checkbox',
    autoSize = true,
    multiSelect,
    onSelect,
    defaultExpanded = false,
    expandedRowRender,
    onInit,
    pagination = true,
    paginationConfig: propPaginationConfig,
    style = {},
    agConfig
  } = props
  const [data, setData] = useState([])
  const [columns, setColumns] = useState(() => propColumns)
  const [gridApi, setGridApi] = useState<GridApi>(null)
  const [curPageNum, setCurPageNum] = useState(
    () => propPaginationConfig?.current || 1
  )
  const [curPageSize, setCurPageSize] = useState(
    () => propPaginationConfig?.pageSize || 10
  )
  const { inputRef, inputRefChange } = useInputRef()
  const getColId = useGetColIdFn()
  const columnApiRef = useRef<ColumnApi>(null)
  const dataMapRef = useRef<Map<string, NomalRecord>>(new Map())

  const columnsAutoSize = () => {
    autoSize &&
    columnApiRef.current &&
    columnApiRef.current.autoSizeAllColumns()
  }
  const refReshIndex = (api: GridApi) => {
    api.forEachNode((node, index) => { node.data[INDEX] = index + 1 })
  }
  const setExpandedRows = (api: GridApi, pRowKey: string) => {
    const parentNode = api.getRowNode(pRowKey)
    if (parentNode) {
      const { data: parent } = parentNode
      const index = parent[INDEX]
      const { children } = parent
      if (isDefArr(children)) {
        api.applyTransactionAsync(
          { add: children, addIndex: index },
          ({ add }) => {
            refReshIndex(api)
            columnsAutoSize()
            add.forEach(({ data: item }) => {
              const id = item[rowKey]
              const isExpanded = item[IS_EXPANDED]
              const { children } = item
              isDefArr(children) && isExpanded && setExpandedRows(api, id)
            })
          }
        )
      }
    }
  }
  const closeExpandedRows = (api: GridApi, pRowKey: string) => {
    const parentNode = api.getRowNode(pRowKey)
    if (parentNode) {
      const { data: parent } = parentNode
      const { children } = parent
      const keys = []
      const deepFind = (list: NomalRecord[]) => {
        list.forEach(item => {
          const id = item[rowKey]
          const { children } = item
          if (isDefArr(children)) {
            const isExpanded = item[IS_EXPANDED]
            isExpanded && deepFind(children)
          }
          keys.push({ [rowKey]: id })
        })
      }
      isDefArr(children) && deepFind(children)
  
      keys.length && api.applyTransactionAsync({ remove: keys }, () => {
        refReshIndex(api)
        columnsAutoSize()
      })
    }
  }

  const setRowData = (api: GridApi, page: number, size: number) => {
    const $data = pagination
      ? sliceData(data, page - 1, size)
      : data;
    const rowData = []
    const deepMap = (list: NomalRecord[]) => {
      list.forEach(item => {
        const isExpaneded = item[IS_EXPANDED]
        const { children } = item
        rowData.push(item)
        if (isDefArr(children) && isExpaneded)
          deepMap(children)
      })
    }
    deepMap($data)
    api.setRowData(rowData.map(((item, index) => ({
      ...item,
      [INDEX]: index
    }))))
  }

  useEffect(() => {
    setData(mapSourceData({
      sourceData,
      rowKey,
      dataMap: dataMapRef.current,
      expandedRowRender: !!expandedRowRender,
      expanded: defaultExpanded
    }))
  }, [sourceData])
  useEffect(() => {
    gridApi && setRowData(gridApi, curPageNum, curPageSize)
  }, [data, gridApi])
  useEffect(() => {
    propColumns.length !== columns.length &&
    difference(columns, propColumns).length &&
    setColumns(propColumns)
  }, [propColumns])
  useEffect(() => {
    if (gridApi) {
      const oldColumns = gridApi.getColumnDefs() as Columns[]
      const firstCol = getFirstColumn(canSelect, orderNum, selectType)
      const final = deepPatch({
        curColumns: columns,
        oldColumns,
        getColIdFn: getColId,
        inputRefChange,
        inputValueChange: () => {}
      })
      gridApi.setColumnDefs([...firstCol, ...final])
      columnApiRef.current.autoSizeAllColumns()
      gridApi.refreshCells({ force: true })
    }
  }, [columns, gridApi, orderNum, canSelect, selectType])

  const handleGridReady = (event: GridReadyEvent) => {
    const { api, columnApi } = event
    columnApiRef.current = columnApi
    setGridApi(api)
    onInit?.(event)
  }

  const handlePaginationChange = (
    page: number,
    size: number,
    cb?: (page: number, size: number) => void
  ) => {
    page !== curPageNum && setCurPageNum(page)
    size !== curPageSize && setCurPageSize(size)
    if (page * size <= data.length && gridApi) setRowData(gridApi, page, size)
    else cb && cb(page, size)
  }

  const handleExpand = (expanded: boolean, rec: NomalRecord, api: GridApi) => {
    const id = rec[rowKey]
    const rowNode = api.getRowNode(id)

    if (rowNode) {
      const { data } = rowNode
      Object.assign(data, { [IS_EXPANDED]: expanded })
      expanded ? setExpandedRows(api, id) : closeExpandedRows(api, id)
      api.applyTransactionAsync({ update: [data] })
      api.refreshCells({ force: true, rowNodes: [rowNode] })
    }
  }

  const selectionConfig = useMemo(() => {
    const selectionType = {
      checkbox: 'multiple',
      radio: 'single'
    }
    return canSelect ? {
      suppressRowClickSelection: true,
      rowSelection: selectionType[selectType],
      onRowSelected: (event: RowSelectedEvent) => {
        console.log("🚀 ~ file: index.tsx ~ line 131 ~ selectionConfig ~ event", event)
      }
    } : {}
  }, [canSelect, selectType])

  const paginationConfig = useMemo(() => {
    return {
      size: 'small' as 'small' | 'default',
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number) => `共 ${total} 条`,
      ...propPaginationConfig,
      current: curPageNum,
      pageSize: curPageSize,
      onChange: (page: number, size: number) => {
        handlePaginationChange(page, size, propPaginationConfig?.onChange)
      }
    }
  }, [propPaginationConfig, curPageNum, curPageSize, handlePaginationChange])

  return (
    <div className="edit-table-container">
      <AgGridReact
        getRowNodeId={(record) => record[rowKey]}
        headerHeight={32}
        rowHeight={32}
        className={`ag-theme-alpine ${className || ''}`}
        onGridReady={handleGridReady}
        loadingOverlayComponent="customLoading"
        noRowsOverlayComponent="customNotFound"
        immutableData
        {...selectionConfig}
        enableCellTextSelection
        enableBrowserTooltips
        debounceVerticalScrollbar
        containerStyle={style}
        {...(agConfig || {})}
        frameworkComponents={{
          renderOrderNum: (params) =>
            <OrderNum {...params} onExpand={handleExpand} />,
          customLoading: CustomLoading,
          customNotFound: CustomNotFound,
          ...agConfig?.frameworkComponents
        }}
        defaultColDef={{
          resizable: true,
          ...agConfig?.defaultColDef
        }}
      />
      {pagination && (
        <div className='pagination-container'>
          <Pagination {...paginationConfig} />
        </div>
      )}
    </div>
  )
}

export default forwardRef(EditTable)

interface EditTableRef {}
