import React, { FC, useCallback, useMemo } from 'react'
import { Mentions } from 'antd'

import type { MentionProps } from 'antd'
import type { Option, Size } from '../../typings'

import './style.scss'

export default (props => {
  const { options, onChange, size, className, ...params } = props

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
    <Mentions
      {...params}
      onChange={handleChange}
      className={`mentions-size-${size} ${className || ''}`}
    >
      {mentionOptions}
    </Mentions>
  )
}) as FC<IProps>

interface IProps extends Omit<MentionProps, 'onChange'> {
  size?: Size
  options: Option<string>[]
  onChange?(value: string, option?: Option<string>): void
}
