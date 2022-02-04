import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form, FormItem, Filter, BaseDictionary, EditTable, Columns } from '../src';
import 'antd/dist/antd.css'
import './style.scss'
import { useState } from 'react';

class Dictionary<T extends Record<string, string>> extends BaseDictionary<T> {
  constructor(codeMap: T, initLoad: boolean = false) {
    super({
      loadDictFun: async (codes) => {
        // console.log('codes is => ', codes);
        return codes.reduce((pre, code) => ({...pre, [code]: [{key: '1', label: '1'}]}), {} as any)
      },
      codeMap,
      initLoad
    })
  }
}

const dict = new Dictionary({
  /**
   * @description 测试
   */
  testKey: 'TESTCODEKEY',
  TESTCODEKEY1: 'TESTCODEKEY1'
})

const App = () => {
  const items: FormItem[] = [
    {
      key: 'input',
      label: '输入框',
      type: 'input',
      required: true,
      rules: [{required: true}]
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
      required: true,
      rules: [{required: true}],
      options: [
        { key: '1', label: '1', value: 1 },
        { key: '2', label: '2', value: 2 },
      ],
      configProps: {
        name: 'my-radio'
      }
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
    {
      key: '',
      label: '',
      type: 'custom',
      noRenderFormItem: true,
      customRender: () => <button type='submit'>Submit</button>
    }
  ];

  const handleSearch = data => {
    return new Promise(resolve => {
      console.log("🚀 ~ file: index.tsx ~ line 150 ~ App ~ data", data)
      setTimeout(resolve, 10000)
    }) as Promise<void>
  }

  const columns: Columns[] = [{
    dataIndex: 'name',
    title: '名称',
    editable: true,
    editType: 'input',
    pinned: 'left',
    isEdit: true,
    configProps: { placeholder: '请输入名称' },
    rule: [
      { type: 'required', msg: '必填项' },
    ]
  }, {
    dataIndex: 'age',
    title: '年龄'
  }, {
    dataIndex: 'test',
    title: '测试',
    editable: true,
    pinned: 'right',
    editType: 'autoComplete',
    options: [],
    onSearch(keyword, rec) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([{key: '123', label: '12333'}, {key: '222', label: <span>123123</span>}])
        }, 1000)
      })
    }
  },{
    dataIndex: 'test1',
    title: '测试1'
  },{
    dataIndex: 'test2',
    title: '测试2'
  },{
    dataIndex: 'test3',
    title: '测试3'
  },{
    dataIndex: 'test4',
    title: '测试4'
  },{
    dataIndex: 'test5',
    title: '测试5'
  },{
    dataIndex: 'test6',
    title: '测试6'
  },{
    dataIndex: 'test7',
    title: '测试7'
  },{
    dataIndex: 'test8',
    title: '测试8'
  },{
    dataIndex: 'test9',
    title: '测试9'
  },{
    dataIndex: 'test10',
    title: '测试10'
  },{
    dataIndex: 'test11',
    title: '测试11',
  }]

  React.useEffect(() => {
    dict.loadDictionary().then(() => {
      // console.log('get dict => ', dict.getDict('testKey'));
    })
  }, [])
  
  return (
    <div className='wrapper'>
      <div className='slider'>slider</div>
      <div className='content'>
        <div className='header'>
          <Filter formItems={items} formKey="filter" onSearch={handleSearch}/>
        </div>
        <div className='form-container'>
          <Form formItems={items} formKey="formKey" onFinish={(values) => {
            // console.log('form on finish values is => ', values)
          }}/>
        </div>
        <EditTable data={[
          {name: '1', age: 1, test: '1', id: '1', children: [
            {name: '1-1', age: 1.1, test: '1-1', id: '1-1'},
            {name: '2-2', age: 2.2, test: '2-2', id: '2-2', children: [
              {name: '2-2-1', age: 2.21, test: '2-2-1', id: '2-2-1'}
            ]},
            {name: '3-3', age: 3.3, test: '3-3', id: '3-3'},
            {name: '4-4', age: 4.4, test: '4-4', id: '4-4'},
          ]},
          {name: '2', age: 2, test: '2', id: '2', children: [
            {name: '2-1', age: 2.1, test: '2-1', id: '2-1'}
          ]},
          {name: '3', age: 3, test: '3', id: '3'},
        ]} columns={columns} canSelect defaultExpanded paginationConfig={{total: 100}}/>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
