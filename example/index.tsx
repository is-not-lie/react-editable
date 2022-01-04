import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form } from '../.';

const App = () => {
  const items = [
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
      key: 'textarea',
      label: '文本框',
      type: 'textarea',
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
      options: ['qwe', 'ssd', 'zxc'],
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
    },
    {
      key: 'switch',
      label: '开关',
      type: 'switch',
    },
  ];

  return (
    <div>
      <Form />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
