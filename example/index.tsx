import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form, FormItem, Filter } from '../.';
import 'antd/dist/antd.css'
import './style.scss'

const App = () => {
  const items: FormItem[] = [
    {
      key: 'input',
      label: '输入框',
      type: 'input',
    },
    {
      key: 'inputNumber',
      label: '数值框',
      type: 'inputNumber',
    },
    {
      key: 'password',
      label: '密码框',
      type: 'password',
    },
    {
      key: 'search',
      label: '搜索框',
      type: 'search',
    },
    {
      key: 'radio',
      label: '单选框',
      type: 'radio',
      options: [
        { key: '1', label: '1', value: 1 },
        { key: '2', label: '2', value: 2 },
      ],
    },
    {
      key: 'checkbox',
      label: '多选框',
      type: 'checkbox',
      options: [
        { key: '1', label: '1', value: 1 },
        { key: '2', label: '2', value: 2 },
        { key: '3', label: '3', value: 3 },
      ],
    },
    {
      key: 'select',
      label: '选择框',
      type: 'select',
      options: [
        { key: '1', label: '1', value: 1 },
        { key: '2', label: '2', value: 2 },
        { key: '3', label: '3', value: 3 },
      ],
    },
    {
      key: 'treeSelect',
      label: '树形选择',
      type: 'treeSelect',
      data: [
        {
          key: '1',
          label: '1',
          value: '1',
          children: [
            {
              key: '1-1',
              label: '1-1',
              value: '1-1',
              children: [
                {
                  key: '1-1-1',
                  label: '1-1-1',
                  value: '1-1-1',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'autoComplate',
      label: '自动完成',
      type: 'autoComplate',
      options: [
        {key: 'qwe', label: 'qwe'},
        {label: 'ssd', key: 'ssd'},
        {label: 'zxc', key: 'zxc'}
      ],
    },
    {
      key: 'cascader',
      label: '级联选择',
      type: 'cascader',
      options: [
        {
          key: '1',
          label: '1',
          value: '1',
          children: [
            {
              key: '1-1',
              label: '1-1',
              value: '1-1',
              children: [
                {
                  key: '1-1-1',
                  label: '1-1-1',
                  value: '1-1-1',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'date',
      label: '时间日期',
      type: 'date',
    },
    {
      key: 'mentions',
      label: '提及',
      type: 'mentions',
      options: [
        {key: '123', label: '123'},
        {key: 'asd', label: 'asd'},
        {key: 'zxc', label: 'zxc'},
      ]
    },
    {
      key: 'switch',
      label: '开关',
      type: 'switch',
    },
    {
      key: 'textarea',
      label: '文本框',
      type: 'textarea',
    },
  ];

  const handleSearch = data => new Promise(resolve => {
    console.log("🚀 ~ file: index.tsx ~ line 150 ~ App ~ data", data)
    setTimeout(resolve, 10000)
  })

  return (
    <div className='wrapper'>
      <div className='slider'>slider</div>
      <div className='content'>
        <div className='header'>
          <Filter formItems={items} formKey="filter" onSearch={handleSearch}/>
        </div>
        <div className='form-container'>
          <Form formItems={items} formKey="formKey"/>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
