import { Create, SimpleForm, TextInput, NumberInput } from "react-admin";

const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <NumberInput source="price" />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Create>
);

export default ProductCreate;
