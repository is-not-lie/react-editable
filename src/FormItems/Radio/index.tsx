import React, { FC, useCallback } from 'react'
import { Radio, Space } from 'antd'

import type { RadioGroupProps, RadioChangeEvent } from 'antd'
import type { Direction, Option } from '../../typings'

export default (props => {
  const {
    options,
    onChange,
    optionType = 'default',
    direction = 'horizontal',
    ...params
  } = props;

  const handleChange = useCallback((event: RadioChangeEvent) => {
    const { checked, disabled, value } = event.target
    onChange && onChange(value, { key: value, checked, disabled, value })
  }, [onChange])

  return (
    <Radio.Group {...params} onChange={handleChange}>
      <Space wrap align="start" direction={direction}>
        {options.map(item => {
          const { key, label, disabled } = item
          return optionType === 'button'
            ? <Radio.Button value={key} disabled={disabled}>{label}</Radio.Button>
            : <Radio value={key} disabled={disabled}>{label}</Radio>
        })}
      </Space>
    </Radio.Group>
  )
}) as FC<IProps>

interface IProps extends Omit<RadioGroupProps, 'options' | 'onChange'> {
  options: Option[]
  direction?: Direction
  onChange?(value: string | number, option?: Omit<Option, 'label'>): void
}
