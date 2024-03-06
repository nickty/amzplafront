import { useNavigate } from "react-router-dom";
import { Menu, MenuItemLink } from "react-admin";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PlumbingOutlinedIcon from "@mui/icons-material/PlumbingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

export const MyMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu>
      {/* <Menu.DashboardItem /> */}
      <MenuItemLink
        to="/dashboard"
        primaryText="Dashboard"
        leftIcon={<DashboardOutlinedIcon />}
        onClick={() => navigate("/dashboard")}
      />
      <Menu.ResourceItem name="products" />
      {/* Other resource items */}
      {/* Custom service items */}
      <MenuItemLink
        to="/market-analysis"
        primaryText="Market Analysis"
        leftIcon={<StorefrontOutlinedIcon />}
        onClick={() => navigate("/market-analysis")}
      />
      <MenuItemLink
        to="/seo-tools"
        primaryText="SEO Tools"
        leftIcon={<PlumbingOutlinedIcon />}
        onClick={() => navigate("/seo-tools")}
      />
      <MenuItemLink
        to="/customer-service"
        primaryText="Auto Customer Service"
        leftIcon={<SupportAgentOutlinedIcon />}
        onClick={() => navigate("/customer-service")}
      />
      <MenuItemLink
        to="/cross-ecommerce"
        primaryText="Other Ecommerce"
        leftIcon={<AddShoppingCartOutlinedIcon />}
        onClick={() => navigate("/cross-ecommerce")}
      />
      <MenuItemLink
        to="/customized-dashboards"
        primaryText="Customized Dashboards"
        leftIcon={<DashboardCustomizeOutlinedIcon />}
        onClick={() => navigate("/customized-dashboards")}
      />
      <MenuItemLink
        to="/repricing"
        primaryText="Repricing"
        leftIcon={<PriceChangeOutlinedIcon />}
        onClick={() => navigate("/repricing")}
      />
      <MenuItemLink
        to="/research"
        primaryText="Search"
        leftIcon={<ContentPasteSearchOutlinedIcon />}
        onClick={() => navigate("/research")}
      />
      <MenuItemLink
        to="/smi"
        primaryText="Social Media Intigration"
        leftIcon={<ShareOutlinedIcon />}
        onClick={() => navigate("/smi")}
      />
      <MenuItemLink
        to="/sustainability-tracking"
        primaryText="Sustainability Tracking"
        leftIcon={<StackedLineChartOutlinedIcon />}
        onClick={() => navigate("/sustainability-tracking")}
      />
      {/* Add more menu items for other coming soon services */}
    </Menu>
  );
};
