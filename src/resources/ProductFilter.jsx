import { Filter, TextInput, NumberInput } from "react-admin";

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by name" source="name" alwaysOn />
    <NumberInput label="Minimum price" source="price_gte" />
    <NumberInput label="Maximum price" source="price_lte" />
  </Filter>
);

export default ProductFilter;
