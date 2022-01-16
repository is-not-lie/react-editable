import React, { FC, useMemo } from 'react'
import {
  Input,
  InputNumber,
  AutoComplate,
  Cascader,
  Checkbox,
  Date,
  RangeDate,
  Mentions,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from '../FormItems'

import type { FormItem } from '../typings'
export default (props => {
  const {
    type,
    size,
    label,
    labelInPlaceholder
  } = props;

  const Content = useMemo(() => {
    const config = {
      size,
      ...(
        labelInPlaceholder &&
        typeof label === 'string' &&
        { placeholder: label }
      )
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
        return (
          <Cascader
            options={props.options}
            onChange={props.onChange}
            {...config}
            {...(props.configProps || {})}
          />
        )
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
        return (
          <Date
            {...config}
            {...(props.configProps || {})}
            dateConfig={props.dateConfig}
            onChange={props.onChange}
          />
        )
      case 'rangeDate':
        return (
          <RangeDate onChange={props.onChange} {...(props.configProps || {})} />
        )
      case 'mentions':
        return (
          <Mentions {...{
            options: props.options,
            onChange: props.onChange,
            prefix: props.prefix,
            ...config,
            ...props.configProps
          }}/>
        )
      case 'radio':
        return (
          <Radio
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
        return null
    }
  }, [props])

  return Content
}) as FC<FormItem & any>
