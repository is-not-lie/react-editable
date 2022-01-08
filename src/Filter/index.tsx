import React, {
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react'
import { Button, Space } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import Form from '../Form'
import { useFormInstance } from '../hooks'

import type { FormProps, FormItem, NomalRecord } from '../typings'
import type { FormInstance } from '../hooks/useFormInstances'
import type { ForwardRefRenderFunction } from 'react'

const Filter: ForwardRefRenderFunction<FilterRef, FilterProps> = (props, ref) => {
  const {
    formKey,
    formItems,
    maxLineCount = 4,
    maxColumnCount = 2,
    onSearch,
    onAfterReset,
    onValidateError,
    ...formProps
  } = props
  const formInstance = useFormInstance(formKey)
  const [expanded, setExpanded] = useState(false)
  const [disableBtnsMap, setDisabledBtnsMap] = useState<Map<string, boolean>>(new Map())
  const [loadingBtnsMap, setLoadingBtnsMap] = useState<Map<string, boolean>>(new Map())

  const setLoading = useCallback((key: 'search' | 'reset') => {
    const btnKeys = ['search', 'reset']
    const newDisableBtnsMap = new Map()
    const newLoadingBtnsMap = new Map()
    btnKeys.forEach(k => {
      newDisableBtnsMap.set(k, k !== key)
      newLoadingBtnsMap.set(k, false)
    })
    newLoadingBtnsMap.set(key, true)
    setDisabledBtnsMap(newDisableBtnsMap)
    setLoadingBtnsMap(newLoadingBtnsMap)
  }, [disableBtnsMap, loadingBtnsMap])
  const resetLoading = useCallback(() => {
    setDisabledBtnsMap(new Map())
    setLoadingBtnsMap(new Map())
  }, [])

  const handleSearch = useCallback(async () => {
    setLoading('search')
    try {
      const validateRes = await formInstance.validate()
      onSearch && (await onSearch(validateRes))
    } catch (error) {
      onValidateError && onValidateError(error)
    }
    resetLoading()
  }, [onSearch, onValidateError])
  const handleReset = useCallback(async () => {
    setLoading('reset')
    formInstance.reset()
    onAfterReset && (await onAfterReset())
    resetLoading()
  }, [onAfterReset])

  const btns = useMemo(() => {
    const baseBtn: ButtonConfigs[] = [
      {
        key: 'search',
        label: '查询',
        type: 'primary',
        fn: handleSearch
      },
      {
        key: 'reset',
        label: '重置',
        type: 'default',
        fn: handleReset
      }
    ]

    if (formItems.length > (maxLineCount * maxColumnCount) - 1) {
      baseBtn.push({
        key: 'expand',
        label: '展开',
        type: 'link',
        fn: async () => setExpanded(!expanded),
        icon: expanded ? <UpOutlined /> : <DownOutlined />
      })
    }

    return (
      <div className='filter-btns-container'>
        <Space>
          {baseBtn.map(btn => {
            const { key, label, type, fn, icon = null } = btn
            const loading = loadingBtnsMap.get(key)
            const disabled = disableBtnsMap.get(key)
            return (
              <Button
                key={key}
                type={type}
                size='small'
                htmlType='button'
                {...(loading && { loading })}
                {...(disabled && { disabled })}
                onClick={fn}
              >
                <Space>
                  {label}
                  {icon}
                </Space>
              </Button>
            )
          })}
        </Space>
      </div>
    )
  }, [
    formItems,
    expanded,
    maxColumnCount,
    disableBtnsMap,
    loadingBtnsMap,
    handleSearch,
    handleReset
  ])

  const getLineCol = useCallback((lastLineCol: number) => {
    if (lastLineCol === 0 || lastLineCol === 24) return 24
    else if (lastLineCol < 24) return 24 - lastLineCol
    return 24 - (lastLineCol % 24)
  }, [])

  const btnContainerCol = useMemo(() => {
    const len = formItems.length
    const lastLineCount = len % maxLineCount
    const lastLineItems = formItems.slice(-(
      lastLineCount === 0 ? maxLineCount : lastLineCount
    ))
    const lastLineCol = lastLineItems.reduce((pre, cur) => {
      return pre + (cur.col || 0)
    }, 0)
    return getLineCol(lastLineCol)
  }, [maxLineCount, maxColumnCount, formItems, getLineCol])

  const mapFormItems = useCallback((items: FormItem[]) => {
    const lastItem = items.slice(-1)[0]
    if (lastItem.key === 'filterBtns') items.pop()

    const filterBtns: FormItem = {
      key: 'filterBtns',
      label: '',
      type: 'custom',
      col: btnContainerCol,
      customRender: () => btns
    }
    return items.concat(filterBtns)
  }, [btnContainerCol, btns])

  const items = useMemo(() => {
    const len = formItems.length
    const count = (maxLineCount * maxColumnCount) - 1
    let $formItems = formItems

    if (!expanded && count < len) {
      $formItems = $formItems.slice(0, count)
    }

    return mapFormItems($formItems)
  }, [formItems, maxLineCount, maxColumnCount, expanded, mapFormItems])

  useImperativeHandle(ref, () => ({
    getInstance: () => formInstance
  }))

  return (
    <div className='form-filter-container'>
      <Form formKey={formKey} formItems={items} {...formProps} />
    </div>
  )
}

export default forwardRef(Filter)

interface FilterRef {
  getInstance: () => FormInstance
}

interface FilterProps extends FormProps {
  /** 一行最大展示个数 */
  maxLineCount?: number
  /** 最大展示列数, 超出列数则显示展开/收起按钮 */
  maxColumnCount?: number
  onSearch?: (formValue?: NomalRecord) => Promise<void>
  onAfterReset?: () => Promise<void>
  onValidateError?: (error: unknown) => Promise<void>
}

interface ButtonConfigs {
  key: 'search' | 'reset' | 'expand',
  label: string,
  type: 'primary' | 'default' | 'link',
  fn: () => Promise<void>
  icon?: React.ReactElement
}
