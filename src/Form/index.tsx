import React, { useEffect, useMemo } from 'react'
import { Form as AntdForm, Row } from 'antd'
import { InstanceStacks } from '../hooks'
import FormItem from './Item'

import type { FormProps } from '../typings'
import type { FC } from 'react'

const { useForm } = AntdForm;
const defaultFormLayout = { wrapperCol: 16, labelCol: 6, col: 6 }
const defaultFlexConfig = { gutter: 8 }
const Form: FC<FormProps> = (props) => {
  const {
    formKey,
    defaultSize,
    onChange,
    flexConfig = defaultFlexConfig,
    formItems,
    defaultLayout = defaultFormLayout,
    ...params
  } = props;
  const [formInstance] = useForm();

  const FormItems = useMemo(() => {
    return formItems.map(item => {
      const { key } = item
      const config = {
        onChange: (value: any, option?: any) =>
          onChange && onChange(key, value, option),
        ...(defaultSize && { size: defaultSize }),
        ...defaultLayout
      }
      return <FormItem {...config} {...item} />
    })
  }, [formItems, defaultLayout, onChange, defaultSize])

  useEffect(() => {
    !InstanceStacks.has(formKey) && InstanceStacks.set(formKey, formInstance)
  }, [])

  return (
    <AntdForm form={formInstance} {...params}>
      <Row {...(flexConfig || {})}>
        {FormItems}
      </Row>
    </AntdForm>
  )
}

export default Form
