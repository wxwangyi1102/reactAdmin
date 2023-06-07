import { useRef, useState } from 'react';
import { keyColumn, textColumn, checkboxColumn } from 'react-datasheet-grid';
import { Space, Dropdown, message } from 'antd';
import HTable from '@/components/h-table';
import { selectColumn } from '@/components/h-table/select';
import { HButton, HSelect, showConfirm } from '@/components/h-antd';
// import { getAdminGoalWithGet } from '@/api/system';
export default function Plate() {
  // 静态数据
  const yearList = [2023, 2022, 2021, 2020, 2019].map((item) => ({
    value: item,
    label: item,
  }));
  const appointYearItems = yearList.map((item, key) => ({ key, label: item.label }));
  const choices = [
    { value: 'chocolate', label: 'chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  // useHooks
  const [messageApi, contextHolder] = message.useMessage();
  const xTable = useRef(null);
  const [tableData, setTableData] = useState([
    { name: 'Elon', department: 'chocolate' },
    { name: 'Jeff', department: ['strawberry'] },
  ]);
  // 初始化数据

  // 请求数据 ------------------------
  // 获取管理员列表
  // getAdminGoalWithGet().then((res) => {});
  // getAdminGoalWithPost().then((res) => {});

  // --------------------

  // table column field
  const columns = [
    { ...keyColumn('active', checkboxColumn), title: '' },
    { ...keyColumn('name', textColumn), title: '板块名称' },
    { ...keyColumn('department', selectColumn({ choices, isMulti: true })), title: '所属部门' },
  ];
  // 动作-按钮
  // 新增
  const handleAdd = () => {
    const defaultRow = {};
    tableData.push(defaultRow);
    setTableData(tableData);
    const $xTable = xTable.current;
    // 激活单元格（必须）
    $xTable && $xTable.setActiveCell({ col: 0, row: tableData.length });
  };
  // 复制行
  const handleInsert = () => {
    showConfirm(
      {},
      () => {
        console.log('点击了确定');
      },
      () => {
        console.log('点击了取消');
      },
    );
  };
  // 删除
  const handleDeleteRow = () => {
    // 是否可以删除
    const isCanDel = tableData.some((item) => item?.active);
    if (!isCanDel) return;

    console.log(tableData, '删除前');
    const otherList = tableData.filter((item) => !item?.active);
    console.log(otherList);
    setTableData(otherList);
    const $xTable = xTable.current;
    // 激活单元格（必须）
    $xTable && $xTable.setActiveCell(null);
  };
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
  // 指定年 key<string>
  const handleAppoint = ({ key }) => {
    const row = appointYearItems.find((item) => item.key === Number(key));
    row?.label && messageApi.info(row?.label);
  };

  return (
    <div className="working-area-container">
      {contextHolder}
      <div className="header">
        <span>2023年度板块配置</span>
      </div>
      {/* body */}
      <div className="body">
        <div className="toolbar">
          <div>
            <Space wrap>
              <span>选择年份</span>
              <HSelect
                defaultValue={new Date().getFullYear()}
                onChange={handleChange}
                options={yearList}
              />
              <HButton type="default">复制上一年</HButton>
              {/* 下拉按钮 */}
              <Dropdown
                menu={{ items: appointYearItems, onClick: handleAppoint }}
                trigger={['click']}
              >
                <HButton type="default">复制指定年</HButton>
              </Dropdown>
            </Space>
          </div>
          <div>
            <Space wrap>
              <HButton onClick={() => handleAdd()}>新增</HButton>
              <HButton onClick={() => handleInsert()}>复制行</HButton>
              <HButton onClick={() => handleDeleteRow()}>删除</HButton>
            </Space>
          </div>
        </div>
        <HTable ref={xTable} data={tableData} columns={columns} setData={setTableData} />
      </div>
      {/* footer */}
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
