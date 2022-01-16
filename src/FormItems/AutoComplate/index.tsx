import React, { FC, useCallback } from 'react'
import { AutoComplete } from 'antd'

import type { AutoCompleteProps } from 'antd'
import type { AutoComplateOption } from '../../typings'

export default (props => {
  const { options, onChange, ...params } = props

  const filterOption = useCallback(
    (inputValue: string, option) =>
      option.label.toString().includes(inputValue.trim()),
    []
  )

  return (
    <AutoComplete
      options={options.map(x => ({...x, value: x.key}))}
      onChange={(value, option) => onChange?.(value, option)}
      filterOption={filterOption}
      {...params}
    />
  )
}) as FC<IProps>

interface IProps extends Omit<AutoCompleteProps, 'onChange' | 'options' | 'children'> {
  options: AutoComplateOption[]
  onChange?(value: string, option: Omit<AutoComplateOption, 'label'>): void
}
