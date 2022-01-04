import React, { FC } from 'react'
import { Cascader } from 'antd'

import type { CascaderProps } from 'antd'
import type { Option } from '../../Form/Form'

export default (props => {
  return <Cascader></Cascader>
}) as FC<IProps>

interface IProps extends CascaderProps<Option> {}
