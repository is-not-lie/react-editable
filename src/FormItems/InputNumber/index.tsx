import React, { FC, useMemo } from 'react'
import { InputNumber } from 'antd'

import type { InputNumberProps } from 'antd'

export default (props => {
  const { style } = props

  const inputStyle = useMemo(() => ({
    width: '100%',
    ...style
  }), [style])

  return <InputNumber style={inputStyle} {...props} />
}) as FC<IProps>

interface IProps extends Omit<InputNumberProps, 'onChange'> {
  onChange?(value?: number | string): void
}
