import { useRef } from 'react'
import { NomalRecord } from '../typings'
import { random } from './tool'

export const useGetColIdFn = () => {
  const colIdMap = useRef<Map<string, string>>(new Map())

  const getColId = (curDataIndex: string, oldDataIndex: string) => {
    if (colIdMap.current.has(curDataIndex) && curDataIndex === oldDataIndex)
      return colIdMap.current.get(curDataIndex)
    
    const colId = random()
    colIdMap.current.set(curDataIndex, colId)
    return colId
  }

  return getColId
}

export interface InputRef extends NomalRecord {
  stopEditing(): void
}
export const useInputRef = () => {
  const inputRef = useRef<InputRef>()

  const inputRefChange = (ref: InputRef) => {
    inputRef.current = ref
  }

  return { inputRef, inputRefChange }
}
