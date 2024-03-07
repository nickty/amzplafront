import { List, Datagrid, TextField, EmailField } from "react-admin";
import UserFilter from "./UserFilter";

export const UserList = (props) => (
  <List filters={<UserFilter />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="role" />
      <EmailField source="email" />
      {/* Add other fields as needed */}
    </Datagrid>
  </List>
);

export default UserList;
