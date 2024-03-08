import {
  Edit,
  SimpleForm,
  SelectInput,
  TextInput,
  useRedirect,
  useNotify,
} from "react-admin";

const UserEdit = (props) => {
  const redirect = useRedirect();
  const notify = useNotify();

  const roleChoices = [
    { id: "admin", name: "Admin" },
    { id: "user", name: "User" },
  ];

  const subscriptionChoices = [
    { id: "basic", name: "Basic" },
    { id: "premium", name: "Premium" },
    { id: "enterprise", name: "Enterprise" },
  ];

  const onSave = () => {
    notify("User updated");
    redirect("/users");
  };

  return (
    <Edit {...props} undoable={false} onSave={onSave}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="email" />
        <SelectInput source="role" choices={roleChoices} />
        <SelectInput source="subscription" choices={subscriptionChoices} />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
