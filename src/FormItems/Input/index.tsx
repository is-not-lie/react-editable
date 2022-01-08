import React, { ChangeEvent, FC, useCallback, useMemo } from 'react'
import { Input } from 'antd'

import type { InputProps } from 'antd'
import type { TextAreaProps } from 'antd/es/input/TextArea'
import type { PasswordProps } from 'antd/es/input/Password'
import type { SearchProps } from 'antd/es/input/Search'

const { Password, Search, TextArea } = Input

export default (props => {
  const { type, size = 'small', onChange, configProps, placeholder } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      onChange && onChange(value)
    },
    [onChange]
  )

  const Content = useMemo(() => {
    const config = { onChange: handleChange, placeholder, size }
    switch(type) {
      case 'password':
        return <Password {...{...config, ...configProps as PasswordProps}} />
      case 'search':
        return <Search {...{...config, ...configProps as SearchProps}} />
      case 'textarea':
        return <TextArea {...{...config, ...configProps as TextAreaProps}} />
      default:
        return <Input {...{...config, ...configProps as InputProps}} />
    }
  }, [size, type, handleChange, configProps])

  return Content
}) as FC<IProps>

interface IBaseProps {
  size?: InputProps['size']
  onChange?(value: string): void
  placeholder?: string
}

interface IInputProps extends IBaseProps {
  type: 'input'
  configProps?: Omit<InputProps, 'onChange'>
}

interface ITextAreaProps extends IBaseProps {
  type: 'textarea'
  configProps?: Omit<TextAreaProps, 'onChange'>
}

interface IPasswordProps extends IBaseProps {
  type: 'password'
  configProps?: Omit<PasswordProps, 'onChange'>
}

interface ISearchProps extends IBaseProps {
  type: 'search'
  configProps?: Omit<SearchProps, 'onChange'>
}

type IProps = IInputProps | ITextAreaProps | IPasswordProps | ISearchProps
