import React from 'react'
import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { IS_EXPANDED, IS_SHOW_ARROW, LEVEL, ORDER_NUM } from '../config'
import { GridApi } from 'ag-grid-community'
import type { FC } from 'react'
import type { NomalRecord } from '../../typings'

import './style.scss'

export default ((props) => {
  const { data, api, onExpand } = props
  const isShowArror = data[IS_SHOW_ARROW]
  const orderNum = data[ORDER_NUM]
  const level = data[LEVEL]
  const expanded = data[IS_EXPANDED]
  const Arrow = expanded ? DownOutlined : RightOutlined

  const handleArrowTrigger = () => onExpand?.(!expanded, data, api)

  return (
    <div className='order-num-container' style={{ textIndent: `${level}em` }}>
      {isShowArror && <Arrow onClick={handleArrowTrigger} className='action'/>}
      {orderNum}
    </div>
  )
}) as FC<OrderNumProps>

interface OrderNumProps {
  api: GridApi
  data: NomalRecord
  onExpand(expanded: boolean, record: NomalRecord, api: GridApi): void
}
