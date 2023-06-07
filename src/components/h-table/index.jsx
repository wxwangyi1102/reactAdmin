import { forwardRef } from 'react';
import { DataSheetGrid } from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';

// Import the style only once in your app!
// ref穿透到table组件
export default forwardRef(function HTable(props, ref) {
  const { data, setData, columns, ...obj } = props;
  const girdStyle = {
    // position: 'relative',
    // marginTop: '32px',
    minHeight: '300px',
    // '--dsg-container-height': '0',
    // '.dsg-container': {
    //   height: 0,
    // },
  };
  // 自定义页脚组件
  // const BottomComponent = (props) => {
  // const { emitWithAddrows, ToolBar } = obj;
  //   if (!ToolBar) return false;
  //   // 传递add-api
  // emitWithAddrows(gridRef);

  //   const toolbarStyle = {
  //     width: '100%',
  //     position: 'absolute',
  //     top: '-32px',
  //   };
  //   return (
  //     <>
  //       <div style={toolbarStyle}>{ToolBar}</div>
  //     </>
  //   );
  // };
  return (
    <DataSheetGrid
      ref={ref}
      value={data}
      columns={columns}
      onChange={setData}
      style={girdStyle}
      addRowsComponent={false}
      {...obj}
    />
  );
});
