import { Admin, CustomRoutes, Resource } from "react-admin";
import ProductList from "./resources/product/ProductList";
import ProductEdit from "./resources/product/ProductEdit";
import dataProvider from "./dataProvider";
import ProductCreate from "./resources/product/ProductCreate";
import { Route } from "react-router-dom";
import ComingSoon from "./components/ComingSoon";
import { MyLayout } from "./components/MyLayout";
import Dashboard from "./components/Dashboard";
import authProvider from "./authProvider";

const App = () => (
  <Admin
    layout={MyLayout}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Route exact path="/dashboard" element={<Dashboard />} />
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
    <CustomRoutes>
      <Route
        path="/market-analysis"
        element={<ComingSoon service="Market Analysis" />}
      />
      <Route
        path="/seo-tools"
        element={<ComingSoon service="Advanced SEO tools" />}
      />
      <Route
        path="/customer-service"
        element={<ComingSoon service="Auto Customer Service" />}
      />
      <Route
        path="/cross-ecommerce"
        element={<ComingSoon service="Cross Platform Ecommerce" />}
      />
      <Route
        path="customized-dashboards"
        element={<ComingSoon service="Customized Dashboards" />}
      />
      <Route path="/repricing" element={<ComingSoon service="Repricing" />} />
      <Route path="/research" element={<ComingSoon service="Research" />} />
      <Route
        path="/smi"
        element={<ComingSoon service="Social Media Intigration" />}
      />
      <Route
        path="/sustainability-tracking"
        element={<ComingSoon service="Sustainability Tracking" />}
      />
    </CustomRoutes>
  </Admin>
);

export default App;
