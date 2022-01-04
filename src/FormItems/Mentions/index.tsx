import React, { FC, useCallback, useMemo } from 'react'
import { Mentions } from 'antd'

import type { MentionProps } from 'antd'
import type { Option } from '../../Form/Form'

export default (props => {
  const { options, onChange, ...params } = props

  const handleChange = useCallback((value: string) => {
    const changeItem = options.find(item => item.key === value)
    onChange && onChange(value, changeItem)
  }, [onChange, options])

  const mentionOptions = useMemo(() => {
    return options.map(option => {
      const { key, label, disabled } = option
      const config = {
        key,
        value: key,
        ...(disabled && {disabled})
      }
      return <Mentions.Option {...config}>{label}</Mentions.Option>
    })
  }, [options])

  return (
    <Mentions {...params} onChange={handleChange}>{mentionOptions}</Mentions>
  )
}) as FC<IProps>

interface IProps extends Omit<MentionProps, 'onChange'> {
  options: Option<string>[]
  onChange?(value: string, option?: Option<string>): void
}
