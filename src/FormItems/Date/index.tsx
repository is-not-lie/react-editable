import React, { useMemo } from 'react'
import { DatePicker } from 'antd'

import type { FC } from 'react'
import type { DatePickerProps } from 'antd'
import type { DateConfig } from '../../typings'

export default (props => {
  const { dateConfig, onChange, style, ...params } = props

  const Content = useMemo(() => {
    const { picker } = dateConfig || {}
    const dateStyle = {
      width: '100%',
      ...style
    }
    switch (picker) {
      case 'year':
      case 'month':
      case 'week':
      case 'quarter':
        return (
          <DatePicker
            {...params}
            {...(dateConfig || {})}
            onChange={(date) => date && onChange && onChange(date.valueOf())}
            style={dateStyle}
          />
        )
      default:
        return (
          <DatePicker
            {...params}
            onChange={(date) => date && onChange && onChange(date.valueOf())}
            style={dateStyle}
          />
        )
    }
  }, [dateConfig, params, onChange])

  return Content
}) as FC<IProps>

interface IProps extends Omit<DatePickerProps, 'onChange' | 'picker'> {
  dateConfig?: DateConfig
  onChange?(value: number): void
}
