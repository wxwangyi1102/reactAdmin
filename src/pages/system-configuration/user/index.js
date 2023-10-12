import {
  useState
} from 'react';
import {
  keyColumn,
  textColumn
} from 'react-datasheet-grid';
import HTable from '@/components/h-table';

import {
  selectColumn
} from '@/components/h-table/select';


export default function User() {
  const choices = [];
  const [tableData, setTableData] = useState([{
    userType: '管理员',
    userName: ['a', 'b']
  }, {
    userType: '监督员',
    userName: ['道路二部']
  }, ]);
  const columns = [{
    ...keyColumn('userType', textColumn),
    title: '角色名称'
  }, {
    ...keyColumn('userName', selectColumn({
      choices,
      isMulti: true
    })),
    title: '姓名'
  }, ];

  return (
    <div className="working-area-container">
      <div className="header">
        <span>角色配置</span>
      </div>
      <div className="body">
        <HTable data={tableData} columns={columns} setData={setTableData} lockRows={true} />
      </div>
    </div>
  );
}