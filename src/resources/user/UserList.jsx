import { List, Datagrid, TextField, EmailField } from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      {/* Add other fields as needed */}
    </Datagrid>
  </List>
);

export default UserList;
