import { Filter, TextInput } from "react-admin";

const UserFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput label="Search by name" source="name" alwaysOn />
    </Filter>
  );
};

export default UserFilter;
