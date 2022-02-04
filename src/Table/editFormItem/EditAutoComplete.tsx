import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import { AutoComplete, Input } from 'antd'
import { EditAutoCompleteProps } from '../../typings/Table/CellEditItem'
import { debounce, difference } from 'lodash'

import type { ForwardRefRenderFunction, ElementRef } from 'react'
import type { AutoComplateOption, NomalRecord } from '../../typings'
const { TextArea } = Input

const EditAutoComplete: ForwardRefRenderFunction<ElementRef<typeof AutoComplete>, EditAutoCompleteProps> = (props, ref) => {
  const {
    value,
    width,
    record,
    options: propOptions,
    configProps = {},
    completeType = 'input',
    onSearch,
    stopEditing,
    onOptionsChange,
    handleValueChange
  } = props
  const [options, setOptions] = useState<AutoComplateOption[]>([])

  const setPropOptions = ($options: AutoComplateOption[]) => {
    if (
      options.length !== $options.length ||
      difference(options, $options).length
    ) {
      setOptions($options)
      onOptionsChange && onOptionsChange($options)
    }
  }

  const getPropOptions = async () => {
    const $options = typeof propOptions === 'function'
      ? await propOptions(record)
      : propOptions
    return $options
  }

  const handleSearch = debounce(async (keyword: string) => {
    const searchRes = onSearch && await onSearch(keyword, record)
    searchRes && setPropOptions(searchRes)
  }, 300)

  const handleChange = (value: string, option: NomalRecord) => {
    handleValueChange?.(value, option)
  }

  useEffect(() => {
    getPropOptions()
      .then(setPropOptions)
  }, [propOptions])

  const style = useMemo(() => {
    const { style: propStyle } = configProps
    return { ...propStyle, width }
  }, [configProps, width])

  const completeOptions = useMemo(() => {
    return options.map(item => ({
      ...item,
      value: item.key
    }))
  }, [options])

  return (
    <div>
      <AutoComplete
        showSearch
        open
        filterOption={(value, option) => {
          console.log("🚀 ~ file: EditAutoComplete.tsx ~ line 76 ~ option", option)
          return true
        }}
        {...configProps}
        ref={ref}
        options={completeOptions}
        value={value}
        onBlur={stopEditing}
        onChange={handleChange}
        onSearch={handleSearch}
        style={style}
      >
        {completeType === 'textarea' && <TextArea />}
      </AutoComplete>
    </div>
  )
}

interface EditAutoCompleteRef {}

export default forwardRef(EditAutoComplete)
