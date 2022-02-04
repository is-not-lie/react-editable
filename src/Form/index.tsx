import React, { useCallback, useEffect, useMemo } from 'react'
import { Col, Form as AntdForm, Row } from 'antd'
import { InstanceStacks, formDataStacks, fieldOptionDataStacks } from '../hooks'
import FormItem from './Item'

import type { FormProps } from '../typings'
import type { FC } from 'react'
import { isDef } from '../tools'
import { pick } from 'lodash'

import './style.scss'

const { useForm } = AntdForm;
const defaultFormLayout = { wrapperCol: 16, labelCol: 6, col: 6 }
const defaultFlexConfig = { gutter: 8 }
const Form: FC<FormProps> = (props) => {
  const {
    formKey,
    defaultSize = 'small',
    onChange,
    flexConfig = defaultFlexConfig,
    formItems,
    defaultLayout = defaultFormLayout,
    className: formClassName,
    proxy,
    ...params
  } = props;
  const [formInstance] = useForm();

  const handleChange = useCallback((key: string, value: any, option?: any) => {
    if (proxy) {
      const data = formDataStacks.get(formKey)
      const optionMap = fieldOptionDataStacks.get(formKey)
      if (optionMap)
        optionMap[key] = option
      else fieldOptionDataStacks.set(formKey, { [key]: option })
      data && (data[key] = value)
    }
    onChange && onChange(key, value, option)
  }, [onChange, formKey])

  const items = useMemo(() => {
    return formItems.map(item => {
      const { key } = item
      const config = {
        onChange: (value: any, option?: any) =>
          handleChange(key, value, option),
        size: defaultSize,
        ...defaultLayout,
        ...item
      }

      const {
        col,
        flex,
        label,
        style,
        rules,
        offset,
        required,
        labelCol,
        sortOrder,
        labelLeft,
        className,
        wrapperCol,
        noRenderFormItem,
        labelInPlaceholder,
        ...inputConfig
      } = config;

      const colProps = {
        span: col,
        ...(isDef(sortOrder) && { order: sortOrder }),
        ...pick(config, ['flex', 'offset'])
      }
      const itemProps = {
        name: key,
        labelAlign: labelLeft ? 'left' : 'right' as 'left' | 'right',
        labelCol: { span: labelCol },
        wrapperCol: { span: wrapperCol },
        ...(!labelInPlaceholder && { label }),
        ...pick(config, [
          'rules',
          'style',
          'required',
          'className',
        ])
      }
      return (
        <Col {...colProps}>
          {
            noRenderFormItem
            ? (
              <FormItem
                {...inputConfig}
                {...pick(config, ['label', 'labelInPlaceholder'])}
              /> 
            ): (
              <AntdForm.Item {...itemProps}>
                <FormItem
                  {...inputConfig}
                  {...pick(config, ['label', 'labelInPlaceholder'])}
                />
              </AntdForm.Item>
            )}
        </Col>
      )
    })
  }, [formItems, defaultLayout, onChange, defaultSize])

  useEffect(() => {
    !InstanceStacks.has(formKey) && InstanceStacks.set(formKey, formInstance)
  }, [])

  return (
    <AntdForm
      {...params}
      form={formInstance}
      className={`form-size-${defaultSize} ${formClassName || ''}`}
    >
      <Row {...(flexConfig || {})}>
        {items}
      </Row>
    </AntdForm>
  )
}

export default Form
