import { useEffect } from "react";
import { NomalRecord } from "../typings";

const proxyDataStacks = new Map<string, NomalRecord<any>>()
const optionDataStacks = new Map<string, NomalRecord<any>>()

const useProxy = (
  formKey: string,
  changeFuns?: NomalRecord<(value: any, option?: any) => void>
) => {
  const data = new Proxy({}, {
    get(tar, prop){
      return tar[prop]
    },
    set(_tar, prop: string, value){
      const option = optionDataStacks.get(formKey)
      changeFuns?.[prop]?.(value, option?.[prop])
      return true
    },
    deleteProperty() {
      return true
    }
  })

  useEffect(() => {
    proxyDataStacks.set(formKey, data)
  }, [])

  return data
}

export default useProxy
export {
  proxyDataStacks as formDataStacks,
  optionDataStacks as fieldOptionDataStacks
}
