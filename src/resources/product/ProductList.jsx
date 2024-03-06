import { List, Datagrid, TextField, NumberField } from "react-admin";
import ProductFilter from "./ProductFilter";
import MyCustomActionComponent from "../../components/MyCustomActionComponent";

const ProductList = (props) => (
  <List filters={<ProductFilter />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="price" />
      <TextField source="description" />
      <MyCustomActionComponent buttonText="Edit" color="#333" />
      <MyCustomActionComponent buttonText="Delete" color="red" />
    </Datagrid>
  </List>
);

export default ProductList;
