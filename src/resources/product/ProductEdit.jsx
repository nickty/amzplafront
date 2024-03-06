import { Edit, SimpleForm, TextInput, NumberInput } from "react-admin";

const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <NumberInput source="price" />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
