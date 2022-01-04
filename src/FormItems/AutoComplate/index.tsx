import React, { FC } from 'react'
import { AutoComplete } from 'antd'

import type { AutoCompleteProps } from 'antd'
import type { AutoComplateOption } from '../../Form/Form'

export default (props => {
  const { options, onChange, ...params } = props

  return (
    <AutoComplete
      options={options.map(x => ({...x, value: x.key}))}
      onChange={(value, option) => onChange?.(value, option)}
      {...params}
    />
  )
}) as FC<IProps>

interface IProps extends Omit<AutoCompleteProps, 'onChange' | 'options' | 'children'> {
  options: AutoComplateOption[]
  onChange?(value: string, option: Omit<AutoComplateOption, 'label'>): void
}
