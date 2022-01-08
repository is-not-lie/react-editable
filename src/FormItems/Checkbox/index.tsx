import React, { FC, useCallback, useMemo, useRef } from 'react'
import { Checkbox, Space } from 'antd'

import type { CheckboxProps } from 'antd'
import type {
  Direction,
  CheckboxOptions,
  CheckboxFormItem,
  CheckboxOmitProp
} from '../../typings'

export default (props => {
  const {
    options,
    onChange,
    disabledGroup,
    direction = 'horizontal',
    ...checkboxProps
  } = props
  const checkeds = useRef<Set<string | number>>(new Set())
  const checkedOptions = useRef<CheckboxOptions[]>([])

  const handleCheck = useCallback(
    (isChecked: boolean, key: string | number, option: CheckboxOptions) => {
      if (isChecked) {
        checkeds.current.add(key)
        !checkedOptions.current.find(item => item.key === key) && checkedOptions.current.push(option)
      } else {
        checkeds.current.delete(key)
        checkedOptions.current.splice(
          checkedOptions.current.findIndex(item => item.key === key),
          1
        )
      }
      onChange && onChange(Array.from(checkeds.current), checkedOptions.current)
    },
    [onChange]
  )

  const checkboxs = useMemo(() => {
    return options.map((option => {
      const { key, label, ...config } = option
      return (
        <Checkbox
          key={key}
          {...config}
          {...(disabledGroup && {disabled: disabledGroup})}
          {...checkboxProps}
          onChange={e => handleCheck(e.target.checked, key, option)}
        >
          {label}
        </Checkbox>
      )
    }))
  }, [options, disabledGroup, checkboxProps, handleCheck])

  return <Space wrap align="start" direction={direction}>{checkboxs}</Space>
}) as FC<IProps>

interface IProps extends Omit<CheckboxProps, CheckboxOmitProp> {
  options: CheckboxOptions[]
  disabledGroup?: boolean
  direction?: Direction
  onChange?: CheckboxFormItem['onChange']
}
