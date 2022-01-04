import React, { FC, useCallback, useMemo } from 'react'
import { Select } from 'antd'

import type { SelectOption } from '../../Form/Form'
import type { SelectProps } from 'antd'

export default (props => {
  const { options, onChange, ...params } = props

  const handleChange = useCallback(
    (value: string | number | string[] | number[], option: any | any[]) => {
      onChange && onChange(value, option)
    },
    [onChange]
  )

  const generateOptions = useCallback((config: SelectOption[]) => {
    return config.map(item => {
      const { key, label, disabled, customLabelRender, group } = item
      return group && group.length
        ? (
          <Select.OptGroup
            key={key}
            label={customLabelRender ? customLabelRender(item) : label}
          >
            {generateOptions(group)}
          </Select.OptGroup>
        )
        : (
          <Select.Option {...{
            key,
            label,
            value: key,
            ...(disabled && { disabled })
          }}>
            {customLabelRender ? customLabelRender(item) : label}
          </Select.Option>
        )
    })
  }, [])

  const selectOptions = useMemo(() => {
    return generateOptions(options)
  }, [options, generateOptions])

  return <Select {...params} onChange={handleChange}>{selectOptions}</Select>
}) as FC<IProps>

interface IProps extends Omit<SelectProps<any>, 'onChange' | 'options'> {
  options: SelectOption[]
  onChange?(value: any, option?: SelectOption | SelectOption[]): void
}
