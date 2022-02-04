import { NomalRecord } from "./index";

export interface DictionaryData extends NomalRecord {
  key: string
  label: string
}

export type LoadDictResult<K extends string> = { [key in K]: DictionaryData[] }

export type LoadDictFun<K extends string> = (codes: string[]) => Promise<LoadDictResult<K>>

export interface DictionaryProps<CodeMap extends NomalRecord<string>> {
  codeMap: CodeMap
  loadDictFun: LoadDictFun<CodeMap[keyof CodeMap]>
  initLoad?: boolean
}
