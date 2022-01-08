import React, { FC, useCallback } from 'react'
import { TreeSelect } from 'antd'

import type { TreeSelectProps } from 'antd'
import type { NomalRecord, TreeData } from '../../typings'

export default (props => {
  const { treeData, onChange, ...params } = props

  const handleChange = useCallback(
    (value: string | number, labelList: React.ReactNode[], extra: NomalRecord) => {
      console.log("🚀 ~ file: index.tsx ~ line 12 ~ extra", extra)
      console.log("🚀 ~ file: index.tsx ~ line 12 ~ labelList", labelList)
      console.log("🚀 ~ file: index.tsx ~ line 12 ~ value", value)
    },
    []
  )

  return (
    <TreeSelect
      fieldNames={{
        label: 'label',
        value: 'key',
        children: 'children'
      }}
      treeData={treeData}
      onChange={handleChange}
      {...params}
    />
  )
}) as FC<IProps>

interface IProps extends Omit<TreeSelectProps<string | number>, 'treeData' | 'onChange'> {
  onChange?(value: string | number | (string | number)[], option?: TreeData): void
  treeData: TreeData[]
}
