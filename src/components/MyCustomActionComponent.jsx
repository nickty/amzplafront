import { EditButton } from "react-admin";

const MyCustomActionComponent = ({
  // basePath,
  // record,
  buttonText,
  color = "primary",
  ...rest
}) => {
  // console.log("hello", buttonText);
  return (
    <EditButton
      variant="outlined"
      style={{ color }}
      // basePath={basePath}
      // record={record}
      label={buttonText}
      {...rest}
    />
  );
};

export default MyCustomActionComponent;
