import React, { FC, useMemo } from 'react'
import { Form, Col } from 'antd'
import { isDef } from '../tools'
import { pick } from 'lodash'
import {
  Input,
  InputNumber,
  AutoComplate,
  Cascader,
  Checkbox,
  Date,
  Mentions,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from '../FormItems'

import type { FormItem } from './Form'
import type { ColProps, FormItemProps } from 'antd'

const { Item } = Form
export default (props => {
  const {
    col,
    key,
    type,
    flex,
    size = 'small',
    label,
    offset,
    sortOrder,
    labelCol,
    wrapperCol,
    labelLeft,
    labelInPlaceholder
  } = props;

  const colProps = useMemo((): ColProps => ({
    ...(isDef(col) && { span: col }),
    ...(isDef(offset) && { offset }),
    ...(isDef(sortOrder) && { order: sortOrder }),
    ...(isDef(flex) && { flex })
  }), [col, offset, sortOrder, flex])

  const formItemProps = useMemo((): FormItemProps => ({
    name: key,
    labelAlign: labelLeft ? 'left' : 'right',
    ...(isDef(labelCol) && { span: labelCol }),
    ...(isDef(wrapperCol) && { span: wrapperCol }),
    ...(!labelInPlaceholder && { label }),
    ...pick(props, [
      'rules',
      'style',
      'required',
      'className',
    ])
  }), [
    key,
    labelLeft,
    labelCol,
    wrapperCol,
    labelInPlaceholder,
    props.rules,
    props.style,
    props.required,
    props.className
  ])

  const Content = useMemo(() => {
    const config = {
      size,
      ...(labelInPlaceholder && { placeholder: label })
    }
    switch(type) {
      case 'input':
        return (
          <Input
            type={type}
            {...config}
            configProps={props.configProps}
            onChange={props.onChange}
          />
        )
      case 'password':
        return (
          <Input
            type={type}
            {...config}
            configProps={props.configProps}
            onChange={props.onChange}
          />
        )
      case 'textarea':
        return (
          <Input
            type={type}
            {...config}
            configProps={props.configProps}
            onChange={props.onChange}
          />
        )
      case 'search':
        return (
          <Input
            type={type}
            {...config}
            configProps={props.configProps}
            onChange={props.onChange}
          />
        )
      case 'inputNumber':
        return (
          <InputNumber
            {...config}
            {...(props.configProps || {})}
            onChange={props.onChange}
          />
        )
      case 'select':
        return (
          <Select
            options={props.options}
            onChange={props.onChange}
            {...config}
            {...(props.configProps || {})}
          />
        )
      case 'treeSelect':
        return (
          <TreeSelect
            treeData={props.data}
            onChange={props.onChange}
            {...config}
            {...(props.configProps || {})}
          />
        )
      case 'autoComplate':
        return (
          <AutoComplate {...{
            ...config,
            ...props.configProps,
            options: props.options,
            onChange: props.onChange
          }}/>
        )
      case 'cascader':
        props.options
        return <Cascader />
      case 'checkbox':
        return (
          <Checkbox
            options={props.options}
            onChange={props.onChange}
            direction={props.direction}
            disabledGroup={props.disabledGroup}
            {...props.configProps}
          />
        )
      case 'date':
        props.dateConfig
        return <Date />
      case 'mentions':
        return (
          <Mentions {...{
            options: props.options,
            onChange: props.onChange,
            prefix: props.prefix,
            ...(labelInPlaceholder && { placeholder: label }),
            ...props.configProps
          }}/>
        )
      case 'radio':
        return (
          <Radio
            name={props.name}
            options={props.options}
            direction={props.direction}
            onChange={props.onChange}
            {...(props.configProps || {})}
          />
        )
      case 'switch':
        return (
          <Switch
            onChange={props.onChange}
            {...(props.configProps || {})}
          />
        )
      case 'custom':
        return props.customRender && props.customRender(props.configProps)
      case 'customComp':
        return props.comp && React.createElement(props.comp, props.configProps)
      default:
        return
    }
  }, [props])

  return (
    <Col {...colProps}>
      <Item {...formItemProps}>{Content}</Item>
    </Col>
  )
}) as FC<FormItem>
