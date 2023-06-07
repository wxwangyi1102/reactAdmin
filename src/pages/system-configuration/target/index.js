import { keyColumn, textColumn } from 'react-datasheet-grid';
import { useState } from 'react';
import HTable from '@/components/h-table';

import { Space, message } from 'antd';
import { HButton, HSelect } from '@/components/h-antd';
// showConfirm;

export default function Targetw() {
  const [tableData, setTableData] = useState([
    { reportFillUserName: 'Elon', departmentName: '道路一部' },
    { reportFillUserName: 'Jeff', departmentName: ['道路二部'] },
  ]);
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    { ...keyColumn('departmentName', textColumn), title: '部门名称' },
    { ...keyColumn('reportFillUserName', textColumn), title: '填报人' },
  ];
  // 静态数据
  const departList = [2023, 2022, 2021, 2020, 2019].map((item) => ({
    value: item,
    label: item,
  }));
  // 动作
  // 下拉选择
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  // 保存
  const handleSubmit = () => {
    if (!tableData || !tableData.length) {
      return messageApi.warning('请填写板块配置数据');
    }
    console.log(tableData);
    messageApi.open({
      type: 'success',
      content: '保存成功',
    });
  };

  return (
    <div className="working-area-container">
      {contextHolder}
      <div className="header">
        <span>2023年度目标配置</span>
      </div>
      <div className="body">
        <div className="toolbar">
          <div>
            <Space wrap>
              <span>选择部门</span>
              <HSelect
                defaultValue={new Date().getFullYear()}
                onChange={handleChange}
                options={departList}
              />
            </Space>
          </div>
        </div>
        <HTable data={tableData} columns={columns} setData={setTableData} />
      </div>

      <div className="footer">
        <Space wrap>
          <HButton ghost={false} onClick={() => handleSubmit()}>
            保存
          </HButton>
        </Space>
      </div>
    </div>
  );
}
