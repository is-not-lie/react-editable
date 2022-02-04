import React, { ForwardRefRenderFunction, forwardRef, useState, useEffect } from 'react'
import { Select, Spin } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

import type { Option } from '../typings'
import { uniqBy } from 'lodash'

const CommonSelect: ForwardRefRenderFunction<
CommonSelectRef,
CommonSelectProps
> = (props, ref) => {
  const {
    fetchDataFun,
    initLoad = true,
    allowClear = true,
    mode = 'single'
  } = props
  const [selectOptions, setSelectOptions] = useState([])

  const fetchData = async (keyword?: string) => {
    const data = await fetchDataFun(keyword || null)
    setSelectOptions(uniqBy(selectOptions.concat(data), 'key'))
  }

  const handleClear = () => {}

  useEffect(() => {
    initLoad && fetchData()
  }, [])

  return (
    <div>
      <Spin>
        <Select
          showSearch
          allowClear={allowClear}
          onSearch={fetchData}
          clearIcon={<CloseCircleOutlined onClick={handleClear} />}
        />
      </Spin>
    </div>
  )
}

export default forwardRef(CommonSelect)

interface CommonSelectRef {}

interface CommonSelectProps {
  fetchDataFun(keyword: string | null): Promise<Option[]>
  initLoad?: boolean
  allowClear?: boolean
  mode?: CommonSelectMode
}

type CommonSelectMode = 'single' | 'multi' | 'singleModal' | 'multiModal' | 'singleTable' | 'multiTable'
