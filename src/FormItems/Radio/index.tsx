import React, { FC, useCallback, useMemo } from 'react'
import { Radio, Space } from 'antd'

import type { RadioGroupProps, RadioChangeEvent } from 'antd'
import type { Option, Direction } from '../../typings'

export default (props => {
  const {
    size,
    value,
    options,
    onChange,
    defaultValue,
    optionType = 'default',
    disabled: groupDisabled,
    buttonStyle = 'outline',
    direction = 'horizontal',
    ...params
  } = props;

  const handleChange = useCallback((isChecked: boolean, option: Option) => {
    if (!isChecked) return
    onChange && onChange(option.key, option)
  }, [onChange])

  const radios = useMemo(() => {
    return options.map((option) => {
      const { key, label, disabled } = option
      const config = {
        key,
        size,
        ...params,
        ...(disabled && {disabled}),
        ...(value && {value}),
        ...(defaultValue && {defaultChecked: true}),
        ...(groupDisabled && {disabled: groupDisabled}),
        onChange:
          (e: RadioChangeEvent) => handleChange(e.target.checked, option)
      }
      return optionType === 'button'
        ? <Radio.Button type={buttonStyle} {...config}>{label}</Radio.Button>
        : <Radio {...config}>{label}</Radio>
    })
  }, [props, handleChange])

  return (
    <Radio.Group>
      <Space wrap align="start" direction={direction}>{radios}</Space>
    </Radio.Group>
  )
}) as FC<IProps>

interface IProps extends Omit<RadioGroupProps, 'options' | 'onChange'> {
  options: Option[]
  direction?: Direction
  onChange?(value: string | number, option?: Option): void
}
