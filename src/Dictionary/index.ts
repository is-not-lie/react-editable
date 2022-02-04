import { DictionaryData, DictionaryProps, LoadDictFun, NomalRecord } from "../typings";

class Dictionary<T extends NomalRecord<string>> {
  private timer: number
  private loadFun: LoadDictFun<T[keyof T]>
  private codeMap: T
  private keyMap: { [key in T[keyof T]]?: keyof T } = {}
  private dictionary: { [key in keyof T]?: DictionaryData[] } = {}

  constructor(props: DictionaryProps<T>) {
    const { codeMap, initLoad, loadDictFun } = props

    this.codeMap = codeMap
    this.loadFun = loadDictFun

    for (const key in codeMap) {
      if (Object.prototype.hasOwnProperty.call(codeMap, key)) {
        const dictKey = codeMap[key]
        this.dictionary[key] = []
        this.keyMap[dictKey] = key
      }
    }

    initLoad && this.loadDictionary()
  }

  public async loadDictionary() {
    const { dictionary, codeMap, keyMap, loadFun } = this
    const codes = Object.values(codeMap)
    const dict = await loadFun(codes)

    if (dict) {
      for (const key in dict) {
        if (Object.prototype.hasOwnProperty.call(dict, key)) {
          const value = dict[key];
          const dictKey = keyMap[key as unknown as T[keyof T]]
          dictionary[dictKey] = value
        }
      }
    }
  }

  /**
   * @param code @type {string | number | symbol}
   */
  public getDict(code: keyof T, setKeyForValue: boolean = false) {
    const dict = this.dictionary[code]
    return setKeyForValue
      ? dict.map(x => ({ ...x, value: x.key }))
      : dict
  }

  /**
   * @override
   * @param codeMap @type {Object}
   * @param reload @type {Boolean} @description 是否立即重新加载 @default false
   */
  public addDict(codeMap: T, reload?: boolean) {
    Object.assign(this.codeMap, codeMap)

    for (const key in codeMap) {
      if (Object.prototype.hasOwnProperty.call(codeMap, key)) {
        if (!this.dictionary[key]) this.dictionary[key] = []
      }
    }

    reload && this.reloadDict()
  }

  async reloadDict(debounce?: boolean, time = 300) {
    if (debounce) {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        await this.loadDictionary()
      }, time) as unknown as number
    }
    else await this.loadDictionary()
  }
}

export default Dictionary
