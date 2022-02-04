import { NomalRecord } from '../index';

type Level = 'ERROR' | 'SUCCESS' | 'WARN';

interface Validate {
  level: Level;
  value?: any;
  msg?: string;
  hide?: boolean;
  id?: string;
  dataIndex?: string;
}

interface RangeRule {
  type: 'length' | 'max' | 'min'
  value: number
  msg?: string
}

interface RequiredRule {
  type: 'required'
  msg?: string
}

interface SyncCustomRule {
  type: 'custom'
  isAsync?: false
  fn(value: any, record: NomalRecord, index: number): Validate
}

interface AsyncCustomRule {
  type: 'custom'
  isAsync: true
  fn(value: any, record: NomalRecord, index: number): Promise<Validate>
}

export type Rule = 
  | RangeRule
  | RequiredRule
  | SyncCustomRule
  | AsyncCustomRule
