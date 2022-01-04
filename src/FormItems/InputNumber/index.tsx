import React, { FC } from 'react'
import { InputNumber } from 'antd'

import type { InputNumberProps } from 'antd'

export default (props => {
  return <InputNumber {...props} />
}) as FC<InputNumberProps>
