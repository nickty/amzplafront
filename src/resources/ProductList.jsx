import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
} from "react-admin";

const ProductList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="price" />
      <TextField source="description" />
      <EditButton basePath="/products" />
      <DeleteButton basePath="/products" />
    </Datagrid>
  </List>
);

export default ProductList;
