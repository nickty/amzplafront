import { Admin, Resource } from "react-admin";
import ProductList from "./resources/ProductList";
import ProductEdit from "./resources/ProductEdit";
import dataProvider from "./dataProvider";
import ProductCreate from "./resources/ProductCreate";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
  </Admin>
);

export default App;
