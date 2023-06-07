import React, { useEffect, useRef } from 'react';
import Select, { components } from 'react-select';
import SpanBlock from '../span';
import { SelectIconOption } from '@/utils/icons';

const selectStyle = (active, focus) => ({
  container: (provided) => ({
    ...provided,
    flex: 1,
    // alignSelf: 'stretch',
    // whiteSpace: 'nowrap',
    pointerEvents: focus ? undefined : 'none',
  }),
  control: (provided) => ({
    ...provided,
    height: '100%',
    border: 'none',
    boxShadow: 'none',
    background: 'none',
  }),
  option: (styles) => ({
    ...styles,
    '.option-icon': {
      width: 18,
      float: 'right',
      opacity: 0,
    },
    ':hover': {
      '.option-icon': {
        opacity: 1,
      },
    },
  }),
  // input: (styles) => ({ ...styles, ...dot() }),
  // singleValue: (styles, { data }) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles, opacity: active ? 1 : 0 }),
  indicatorSeparator: (styles) => ({ ...styles, opacity: 0 }),
  indicatorsContainer: (styles) => ({ ...styles, opacity: active ? 1 : 0 }),
});

const SelectComponent = React.memo(
  ({ focus, active, columnData, rowData, setRowData, stopEditing }) => {
    const ref = useRef(null);
    // 自定义 select-option
    const animatedComponents = (props) => {
      const { data } = props;
      return (
        <components.Option {...props}>
          {data.label}
          <SelectIconOption label={data.label} />
        </components.Option>
      );
    };
    // 自定义input区域
    const ValueContainer = ({ children, getValue, ...props }) => {
      // let displayChips = React.Children.toArray(children).slice(0, maxToShow); // 默认样式
      let maxToShow = 2;
      // console.log(getValue());
      var length = getValue().length;
      let shouldBadgeShow = length > maxToShow;
      let displayLength = length - maxToShow;

      const MultipleSelectElement = () =>
        getValue()
          .slice(0, maxToShow)
          .map((item, key) => <SpanBlock text={item?.value} key={key} />)
          .concat(shouldBadgeShow ? <SpanBlock text={`+${displayLength}`} key={length + 1} /> : []);
      return (
        <components.ValueContainer {...props}>
          <MultipleSelectElement />
        </components.ValueContainer>
      );
    };
    const { isMulti, disabled, choices } = columnData;
    // console.log(choices, rowData);
    // 获取默认数据
    const defaultValue = choices.filter((item) =>
      isMulti ? rowData?.includes(item.value) : item.value === rowData,
    );
    useEffect(() => {
      console.log(focus, 1);
      if (focus) {
        ref.current?.focus();
      } else {
        ref.current?.blur();
      }
    }, [focus]);

    return isMulti ? (
      <Select
        ref={ref}
        isMulti
        menuIsOpen={focus}
        isDisabled={disabled}
        defaultValue={defaultValue}
        options={choices}
        hideSelectedOptions={false}
        onChange={(val, { action }) => {
          if (action === 'clear') return setRowData([]);
          setRowData(val.map((v) => v.value));
          choices?.length === val?.length && stopEditing({ nextRow: false });
        }}
        closeMenuOnSelect={false}
        onMenuClose={() => stopEditing({ nextRow: false })}
        components={{ Option: animatedComponents, ValueContainer }}
        className="basic-multi-select"
        classNamePrefix="select"
        styles={selectStyle(active, focus)}
        menuPortalTarget={document.body}
      />
    ) : (
      <Select
        ref={ref}
        menuIsOpen={focus}
        options={choices}
        isDisabled={disabled}
        defaultValue={defaultValue}
        onChange={({ value }) => {
          setRowData(value);
          stopEditing({ nextRow: false });
        }}
        closeMenuOnSelect={false}
        onMenuClose={() => stopEditing({ nextRow: false })}
        className="basic-single"
        classNamePrefix="select"
        styles={selectStyle(active, focus)}
        menuPortalTarget={document.body}
      />
    );
  },
);

export const selectColumn = (options) => {
  return {
    component: SelectComponent,
    columnData: options,
    // keepFocus: true,
    // disableKeys: true,
    // disabled: options.disabled,
    // deleteValue: () => null,
    // copyValue: ({ rowData }) =>
    //   options.choices.find((choice) => choice.value === rowData)?.label ?? null,
    // pasteValue: ({ value }) =>
    //   options.choices.find((choice) => choice.label === value)?.value ?? null,
  };
};
