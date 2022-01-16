import type { FormInstance } from 'antd'
import type { NomalRecord } from '../typings'

export const InstanceStacks = new Map<string, FormInstance>()

const useFormInstance = (formKey: string): Instance => {
  const setValue = (value: NomalRecord) => {
    InstanceStacks.get(formKey)?.setFieldsValue(value)
  }

  const reset = () => {
    InstanceStacks.get(formKey)?.resetFields()
  }

  const getInstance = () => InstanceStacks.get(formKey)

  const validate = () => InstanceStacks.get(formKey)?.validateFields()

  return { setValue, reset, getInstance, validate };
}

export default useFormInstance

interface Instance {
  setValue(value: NomalRecord): void
  reset(): void
  validate(): Promise<NomalRecord> | undefined
  getInstance: () => FormInstance | undefined
}

export {
  Instance as FormInstance
}
