import React, { useEffect, useMemo } from 'react'
import { Form as AntdForm, Row } from 'antd'
import { InstanceStacks } from '../hooks'
import FormItem from './Item'

import type { FormProps } from './Form'
import type { FC } from 'react'

const { useForm } = AntdForm;

const Form: FC<FormProps> = (props) => {
  const {
    formKey,
    defaultSize,
    onChange,
    flexConfig,
    formItems,
    defalutLayout,
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
        ...defalutLayout
      }
      return <FormItem {...config} {...item} />
    })
  }, [formItems, defalutLayout, onChange, defaultSize])

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
