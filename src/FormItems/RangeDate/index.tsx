import React from 'react'
import { DatePicker } from 'antd'

import type { FC } from 'react'
import type { RangeDateFormItem } from '../../Form/Form'

export default (props => {
  const { onChange, ...params } = props

  return (
    <DatePicker.RangePicker
      {...params}
      onChange={(dates) => onChange?.(dates?.map((date) => date?.valueOf()))}
      picker="time"
    />
  )
}) as FC<IProps>

type IProps = {
  onChange?(value?: (number | undefined)[]): void
} & RangeDateFormItem['configProps']
