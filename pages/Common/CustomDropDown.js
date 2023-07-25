import Select from "react-select";

const CustomSelectComp = (props) => {
  return (
    <>
      <Select
        placeholder={props.placeholder || props.label}
        simpleValue
        onChange={(e) => {
          if (props.isClearable) {
            props.onChange(e);
          } else {
            if (props.obj) {
              props.setValue(e);
            } else {
              props.setValue(e.value);
            }
          }
        }}
        value={props.isClearable ? props.defaultValue : props.defaultValue ? props?.options?.find((x) => x.value == props.defaultValue) : null}
        isDisabled={props.disabled}
        openOnClick={false}
        options={props.options}
        theme={{ borderRadius: 10, minHeight: 20, spacing: { baseUnit: 5, controlHeight: 30, menuGutter: 25 } }}
        styles={{
          background: "white",

          container: (base, action) => {
            return { ...base, minHeight: "1px !important", height: "60px", textTransform: "capitalize" };
          },
          option: (base, state) => ({ ...base }),
          menu: (base) => ({ ...base, zIndex: 100, marginTop: "-10px" }),
          control: (base, action) => {
            return { ...base };
          },
          singleValue: (base) => {
            return { ...base, color: "black", textTransform: "capitalize" };
          },
        }}
        {...props}
      />
    </>
  );
};

CustomSelectComp.defaultProps = {
  bank: false,
};

export default CustomSelectComp;
