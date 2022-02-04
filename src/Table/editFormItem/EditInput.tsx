import React, { forwardRef } from 'react'
import { Input } from 'antd'
import type { ForwardRefRenderFunction, ElementRef } from 'react'
import type { EditInputProps } from '../../typings/Table/CellEditItem'

const EditInput: ForwardRefRenderFunction<ElementRef<typeof Input>, EditInputProps> = (props, ref) => {
  const {
    value,
    width,
    configProps,
    stopEditing,
    handleValueChange
  } = props
    console.log("🚀 ~ file: EditInput.tsx ~ line 14 ~ width", width)
  return (
    <Input
      ref={ref}
      style={{ width }}
      onChange={e => handleValueChange(e.target.value)}
      value={value}
      onBlur={stopEditing}
      {...configProps}
    />
  )
}

export default forwardRef(EditInput)
