import React, { useMemo } from 'react'
import { Cascader } from 'antd'

import type { FC } from 'react'
import type { CascaderProps } from 'antd'
import type { CascaderOption } from '../../Form/Form'

export default (props => {
  const { options, onChange, ...params } = props

  const cascaderOptions = useMemo(() => {
    const deepMap = (data: CascaderOption[]): (CascaderOption & {value: CascaderOption['key']})[] => {
      return data.map(item => {
        const { children, key } = item
        return {
          ...item,
          value: key,
          ...(children && children.length && { children: deepMap(children) })
        }
      })
    }

    return deepMap(options)
  }, [options])

  return (
    <Cascader {...params} options={cascaderOptions}/>
  )
}) as FC<IProps>

interface IProps extends Omit<CascaderProps<any>, 'options'> {
  options: CascaderOption[]
}

