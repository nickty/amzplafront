import { List, Datagrid, TextField, EmailField } from "react-admin";
import UserFilter from "./UserFilter";
import MyCustomActionComponent from "../../components/MyCustomActionComponent";

export const UserList = (props) => {
  // const ddd = useListContext();

  // console.log("first", ddd);

  return (
    <List filters={<UserFilter />} {...props}>
      <Datagrid>
        <TextField source="id" />
        <EmailField source="email" />
        <TextField source="role" />
        <TextField source="subscription" />
        <MyCustomActionComponent buttonText="Edit" color="#333" />
        <MyCustomActionComponent buttonText="Delete" color="red" />
      </Datagrid>
    </List>
  );
};

export default UserList;
