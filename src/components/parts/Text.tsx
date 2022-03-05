import { useController, UseControllerProps } from "react-hook-form";
import { TextField } from "@material-ui/core";

type Props = {
  placeholder?: string;
  type?: string;
  label?: string;
  width?: string;
  required?: boolean;
  className?: string;
  enterKeyEvent?: () => void;
};

export const Text = (props: UseControllerProps<any> & Props) => {
  const {
    placeholder = "",
    type = "text",
    width = "10rem",
    required = false,
    label = "",
    className,
    enterKeyEvent,
  } = props;
  const { field } = useController(props);
  const { name, onBlur, onChange, value, ref } = field;
  return (
    <TextField
      className={className}
      label={label}
      name={name}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      ref={ref}
      type={type}
      style={{ width: width }}
      required={required}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          // エンターキー押下時の処理
          enterKeyEvent && enterKeyEvent();
        }
      }}
    />
  );
};
