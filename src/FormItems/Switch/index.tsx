import React, { FC } from 'react'
import { Switch } from 'antd'

import type { SwitchProps } from 'antd'

export default (props => {
  const { onChange, ...params } = props
  return <Switch {...params} onChange={isChecked => onChange?.(isChecked)}/>
}) as FC<IProps>

interface IProps extends Omit<SwitchProps, 'onChange'> {
  onChange?(isChecked: boolean): void
}
