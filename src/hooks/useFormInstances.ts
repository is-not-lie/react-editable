import type { FormInstance } from 'antd'
import { useCallback, useMemo } from 'react'

export const InstanceStacks = new Map<string, FormInstance>()

const useFormInstance = (formKey: string): Instance => {
  const setValue = useCallback((value: NomalRecord) => {
    InstanceStacks.get(formKey)?.setFieldsValue(value)
  }, [formKey])

  const reset = useCallback(() => {
    InstanceStacks.get(formKey)?.resetFields()
  }, [formKey])

  const getInstance = useCallback((): FormInstance | undefined => InstanceStacks.get(formKey), [formKey])

  const validate = useCallback(() =>
    InstanceStacks.get(formKey)?.validateFields(),
  [formKey])


  const instance = useMemo(() => ({ setValue, reset, getInstance, validate }), [setValue, reset, getInstance, validate])

  return instance;
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
