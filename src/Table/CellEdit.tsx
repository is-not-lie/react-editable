import React, { ForwardRefRenderFunction, forwardRef, useState, useMemo, useRef, useEffect, useImperativeHandle } from 'react'
import { EditAutoComplete, EditInput } from './editFormItem'
import type { NomalRecord } from '../typings'
import type { CellEditProps } from '../typings/Table/CellEditComp'

const CellEdit: ForwardRefRenderFunction<CellEditRef, CellEditProps> = (props, ref) => {
  const {
    value: propVal,
    node,
    colDef,
    api,
    columnApi,
    eGridCell,
    data,
    rowIndex,
    stopEditing,
  } = props
  const {
    rule,
    editType,
    dataIndex,
    isEdit = true,
    onChange,
    inputRefChange,
    transferRender,
  } = colDef
  const [value, setValue] = useState(() => propVal)
  const inputRef = useRef<{ focus(): void } & any>(null)

  const handleValueChange = (inputValue: any, extra?: NomalRecord) => {
    setValue(inputValue)
  }

  const EditComp = useMemo(() => {
    const commonProps = {
      ref: inputRef,
      value,
      record: data,
      width: eGridCell.style.width,
      handleValueChange,
      stopEditing,
    }
    switch (editType) {
      case 'input':
        return <EditInput {...commonProps} configProps={colDef.configProps} />
      case 'inputNumber':
        return
      case 'textarea':
        return
      case 'select':
        return
      case 'treeSelect':
        return
      case 'date':
        return
      case 'rangePicker':
        return
      case 'cascader':
        return
      case 'search':
        return
      case 'autoComplete':
        return (
          <EditAutoComplete
            {...commonProps}
            configProps={colDef.configProps}
            options={colDef.options}
            onSearch={colDef.onSearch}
          />
        )
      default:
        return null
    }
  }, [
    editType,
    value,
    data,
    eGridCell,
    colDef.configProps,
    (colDef as any).options,
    (colDef as any).onSearch,
    stopEditing,
    handleValueChange,
  ])
  const cellIsEdit = useMemo(() => {
    return typeof isEdit === 'function'
      ? isEdit(data, rowIndex)
      : isEdit
  }, [data, rowIndex, isEdit])

  useEffect(() => {
    propVal !== value && setValue(propVal)
  }, [propVal])
  useEffect(() => {
    /** 异步调用 focus, 防止组件未渲染 */
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRefChange?.(inputRef.current)
      }
    })
  }, [EditComp])

  const noEditRender = useMemo(() => {
    if (transferRender)
      return transferRender({
        value,
        record: data,
        rowIndex
      })
    return value
  }, [value, transferRender, data, rowIndex])

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    isPopup: () => false,
    refresh() {},
  }))

  return (
    <div className='cell-edit-container'>
      { cellIsEdit ? EditComp : <p>{noEditRender}</p> }
    </div>
  )
}

export default forwardRef(CellEdit)

interface CellEditRef {
  getValue(): any
  isPopup(): false
  refresh(): void
}
