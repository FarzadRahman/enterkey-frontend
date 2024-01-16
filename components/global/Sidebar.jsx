//next/react imports
import Link from "next/link";
import React, { useState, useEffect } from "react";

//redux imports
import { connect } from "react-redux";

//sidebar components
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../pages/theme";

//Icons import
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactsIcon from "@mui/icons-material/Contacts";
import KeyIcon from "@mui/icons-material/Key";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddchartIcon from "@mui/icons-material/Addchart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BusinessIcon from "@mui/icons-material/Business";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import FaceIcon from "@mui/icons-material/Face";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExtensionIcon from "@mui/icons-material/Extension";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CodeIcon from "@mui/icons-material/Code";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import MoveDownIcon from "@mui/icons-material/MoveDown";

//Components
import Modal from "../services/Modal";
import CreateRole from "../forms/modalForms/CreateRole";
import CreatePermission from "../forms/modalForms/CreatePermission";
import { useDispatch } from "react-redux";
import { setCollapse } from "../../store/actions/auth";

const Item = ({ title, to, icon, selected, setSelected, change, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        {
          width < 600 && change();
        }
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = ({ name, roles, company, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");

  //modals variables
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPermModal, setShowPermModal] = useState(false);

  //Responsive
  const [width, setWidth] = useState(window.innerWidth);
  const [opened, setOpened] = useState([
    {
      name: "user",
      isOpen: false,
    },
    {
      name: "role",
      isOpen: false,
    },
    {
      name: "permission",
      isOpen: false,
    },
    {
      name: "companies",
      isOpen: false,
    },
    {
      name: "companySettings",
      isOpen: false,
    },
    {
      name: "branch",
      isOpen: false,
    },
    {
      name: "department",
      isOpen: false,
    },
    {
      name: "grade",
      isOpen: false,
    },
    {
      name: "designation",
      isOpen: false,
    },
    {
      name: "employees",
      isOpen: false,
    },
    {
      name: "application",
      isOpen: false,
    },
    {
      name: "employee",
      isOpen: false,
    },
    {
      name: "Taskasrecorder",
      isOpen: false,
    },
    {
      name: "taskApprover",
      isOpen: false,
    },
    {
      name: "Activity",
      isOpen: false,
    },
    // {
    //   name: "bom",
    //   isOpen: false,
    // },
    // {
    //   name: "customers",
    //   isOpen: false,
    // },
    // {
    //   name: "mushak",
    //   isOpen: false,
    // },
    // {
    //   name: "orders",
    //   isOpen: false,
    // },
    // {
    //   name: "products",
    //   isOpen: false,
    // },
    // {
    //   name: "purchases",
    //   isOpen: false,
    // },
    // {
    //   name: "vendors",
    //   isOpen: false,
    // },
    // {
    //   name: "hscodes",
    //   isOpen: false,
    // },
    // {
    //   name: "stock",
    //   isOpen: false,
    // },
    // {
    //   name: "transfer",
    //   isOpen: false,
    // },
    // {
    //   name: "report",
    //   isOpen: false,
    // },
    // {
    //   name: "categories",
    //   isOpen: false,
    // },
  ]);

  // SET WINDOW SIZE
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Redux
  const dispatch = useDispatch();

  // SET COLLAPSED
  const change = () => {
    dispatch(setCollapse(!isCollapsed));
  };

  // SET OPENED
  const handleChange = (name) => {
    opened?.map((submenu, index) => {
      if (submenu.name == name) {
        let newOpened = [...opened];
        newOpened[index].isOpen = !newOpened[index].isOpen;
        setOpened(newOpened);
      } else if (submenu.isOpen) {
        let newOpened = [...opened];
        newOpened[index].isOpen = !newOpened[index].isOpen;
        setOpened(newOpened);
      }
    });
  };

  // console.log(roles);

  return (
    <>
      {/* Modals */}
      <Modal onClose={() => setShowRoleModal(false)} show={showRoleModal}>
        <CreateRole />
      </Modal>
      <Modal onClose={() => setShowPermModal(false)} show={showPermModal}>
        <CreatePermission />
      </Modal>

      {/* Sidebar */}
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            // background: `${colors.primary[400]} !important`,
            background: "#fff !important",
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar
          collapsed={isCollapsed}
          collapsedWidth={width > 600 ? "100px" : "0px"}
          width={width > 600 ? "290px" : "100vw"}
        >
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={change}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <img
                    alt="profile-user"
                    width="130px"
                    height="130px"
                    src={`../../assets/images/logo.jpg`}
                    style={{ cursor: "pointer" }}
                  />
                  <IconButton onClick={change}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && <hr />}

            {!isCollapsed && (
              <Box mb="25px">
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/images/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box> */}
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {name}
                  </Typography>
                  {roles && (
                    <Typography variant="h5" color={colors.greenAccent[500]}>
                      <b>{roles[0]?.name}</b>
                    </Typography>
                  )}
                  {company && (
                    <Typography variant="h5" color={colors.greenAccent[300]}>
                      <b>{company?.slug}</b>
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {!isCollapsed && <hr />}

            <Box paddingLeft={isCollapsed ? undefined : "5%"}>
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                change={change}
                width={width}
              />

              {/* Purchases */}
              {/* <SubMenu
                title="Purchase"
                icon={<ShoppingCartIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("purchases");
                }}
                open={opened[7].isOpen}
              >
                <Item
                  title="Local Purchase"
                  to="/purchases/grn"
                  icon={<ShoppingBasketIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Imported Purchase"
                  to="/purchases/grnImported"
                  icon={<ShoppingBasketIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Bulk Purchase"
                  to="/purchases/bulkPurchase"
                  icon={<ShoppingBasketIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Purchase List"
                  to="/purchases/purchaseList"
                  icon={<FormatListBulletedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Purchase Return List"
                  to="/purchases/returnList"
                  icon={<FormatListBulletedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu> */}

              {/* Orders */}
              {/* <SubMenu
                title="Sale Order"
                icon={<ShoppingBagIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("orders");
                }}
                open={opened[5].isOpen}
              >
                <Item
                  title="New Sale"
                  to="/orders/createOrder"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Bulk Sale"
                  to="/orders/bulkOrder"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Manual Sales Return"
                  to="/orders/createReturn"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Sales Order List"
                  to="/orders/OrderList"
                  icon={<FormatListBulletedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Sales Return List"
                  to="/orders/returnList"
                  icon={<FormatListBulletedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu> */}

              {/* Vendors */}
              {/* <SubMenu
                title="Manage Vendors"
                icon={<StoreIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("vendors");
                }}
                open={opened[8].isOpen}
              >
                <Item
                  title="Create New Vendor"
                  to="/vendors/createVendor"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Vendor List"
                  to="/vendors/vendorList"
                  icon={<FormatListBulletedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu> */}

              {/* Customers */}
              {/* <SubMenu
                title="Manage Customers"
                icon={<FaceIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("customers");
                }}
                open={opened[3].isOpen}
              >
                <Item
                  title="Create New Customer"
                  to="/customers/createCustomer"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Bulk Create Customer"
                  to="/customers/bulkCustomer"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Customer List"
                  to="/customers/customerList"
                  icon={<ContactsIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu> */}

              {/* MUSHAK */}
              {/* <SubMenu
                title="Mushak"
                icon={<ReceiptIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("mushak");
                }}
                open={opened[4].isOpen}
              >
                <Item
                  title="Mushak 9.1"
                  to="/mushak/mushak_91"
                  icon={<AssignmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Mushak 6.1"
                  to="/purchases/purchaseVat"
                  icon={<AssignmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Mushak 6.2"
                  to="/products/productVat"
                  icon={<AssignmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Mushak 6.2.1"
                  to="/purchases/purchaseVatGoods"
                  icon={<AssignmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Mushak 6.2.1-Branch"
                  to="/purchases/purchaseVatGoodsBranch"
                  icon={<AssignmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Mushak 6.10"
                  to="/mushak/mushak_610"
                  icon={<AssignmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Report"
                  to="/mushak/report"
                  icon={<AssignmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <SubMenu
                  title="VAT Deposit"
                  icon={<CreditScoreIcon />}
                  style={{
                    color: colors.grey[100],
                  }}
                >
                  <Item
                    title="New Deposit"
                    to="/mushak/subForms/vatDeposit/createVatDeposit"
                    icon={<AddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />
                  <Item
                    title="Deposit List"
                    to="/mushak/subForms/vatDeposit/vatDepositList"
                    icon={<CreditScoreIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />
                </SubMenu>
                <SubMenu
                  title="VAT Adjustment"
                  icon={<CreditScoreIcon />}
                  style={{
                    color: colors.grey[100],
                  }}
                >
                  <Item
                    title="New Adjustment"
                    to="/mushak/subForms/adjustments/createAdjustment"
                    icon={<AddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />
                  <Item
                    title="Adjustment List"
                    to="/mushak/subForms/adjustments/adjustmentList"
                    icon={<CreditScoreIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />
                </SubMenu>
              </SubMenu> */}

              {/* Products */}
              {/* <SubMenu
                title="Manage Products"
                icon={<CategoryIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("products");
                }}
                open={opened[6].isOpen}
              >
                <Item
                  title="Create New Product"
                  to="/products/createProduct"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Bulk Product Upload"
                  to="/products/bulkProduct"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Finished Goods"
                  to="/products/finishedGoodList"
                  icon={<ExtensionIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Raw Materials"
                  to="/products/rawMaterialList"
                  icon={<FormatPaintIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Services"
                  to="/products/serviceList"
                  icon={<DesignServicesIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Spare Parts"
                  to="/products/accessoriesList"
                  icon={<BeachAccessIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu> */}

              {/* Stock */}
              {/* <SubMenu
                title="Manage Stock"
                icon={<InventoryIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("stock");
                }}
                open={opened[12].isOpen}
              >
                <Item
                  title="Receive Finished Goods"
                  to="/products/receiveGood"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Received Goods List"
                  to="/products/goodList"
                  icon={<FormatListBulletedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Product Stocks"
                  to="/products/productStock"
                  icon={<InventoryIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Create Stock"
                  to="/products/createStock"
                  icon={<InventoryIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Opening Stock List"
                  to="/products/stockList"
                  icon={<InventoryIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu> */}

              {/* Stock Transfer */}
              {/* <SubMenu
                title="Transfer Stock"
                icon={<MoveDownIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("transfer");
                }}
                open={opened[15].isOpen}
              >
                <Item
                  title="Transfer Product"
                  to="/transfers/transferProduct"
                  icon={<MoveDownIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Bulk Transfer"
                  to="/transfers/bulkTransfer"
                  icon={<MoveDownIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Transfer List"
                  to="/transfers/transferList"
                  icon={<FormatListBulletedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu> */}

              {/* BOM */}
              {/* <SubMenu
                title="Manage BOM"
                icon={<ReceiptIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("bom");
                }}
                open={opened[1].isOpen}
              >
                <Item
                  title="Create New BOM"
                  to="/bom/createBom"
                  icon={<AddchartIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="BOM List"
                  to="/bom/bomList"
                  icon={<ReceiptLongIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="BOM Template"
                  to="/bom/bomTemplate"
                  icon={<ReceiptLongIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Value Addition Settings"
                  to="/settings/vatSettings_4_3"
                  icon={<SettingsApplicationsIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu> */}
               {roles == 1 && (
              <SubMenu
                title="Manage User"
                icon={<PersonIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("user");
                }}
                open={opened[0].isOpen}
              >
                <Item
                  title="Create New User"
                  to="/users/createUser"
                  icon={<PersonAddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="User List"
                  to="/users/userList"
                  icon={<ContactsIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu>
               )}

              {/* Roles */}
              {roles == 1 && (
              <SubMenu
                title="Manage Roles"
                icon={<GroupIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("role");
                }}
                open={opened[1].isOpen}
              >
                <MenuItem
                  active={selected === "Create Role"}
                  style={{
                    color: colors.grey[100],
                  }}
                  onClick={() => {
                    setSelected("Create Role");
                    setShowRoleModal(true);
                    window.scrollTo({
                      top: 0,
                      behavior: "instant",
                    });
                  }}
                  icon={<AddIcon />}
                >
                  <Typography>Create Role</Typography>
                </MenuItem>
                <Item
                  title="Role List"
                  to="/roles/roleList"
                  icon={<FormatListBulletedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu>
              )}
              {/* Permissions */}
              {roles == 1 && (
              <SubMenu 
                title="Manage Permissions"
                icon={<KeyIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("permission");
                }}
                open={opened[2].isOpen}
              >
                <MenuItem
                  active={selected === "Create Permission"}
                  style={{
                    color: colors.grey[100],
                  }}
                  onClick={() => {
                    setSelected("Create Permission");
                    setShowPermModal(true);
                    window.scrollTo({
                      top: 0,
                      behavior: "instant",
                    });
                  }}
                  icon={<AddIcon />}
                >
                  <Typography>Create Permission</Typography>
                </MenuItem>
              </SubMenu>
              )}
              {/* Companies */}
              {roles == 1 && (
              <SubMenu
                title="Manage Company"
                icon={<BusinessIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("companies");
                }}
                open={opened[3].isOpen}
              >
                <Item
                  title="Create New Company"
                  to="/companies/createCompany"
                  icon={<AddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Company List"
                  to="/companies/companyList"
                  icon={<DomainAddIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu>
              )}

              {/* Company Settings */}
              {/* <SubMenu
                title="Company Settings"
                icon={<SettingsApplicationsIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("companySettings");
                }}
                open={opened[4].isOpen}
              >
                <Item
                  title="Company Profile"
                  to="/companies/companySettings"
                  icon={<BusinessIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu> */}

              {/* Branches */}
              {roles == 2 && (
              <SubMenu
                title="Manage Branch"
                icon={<AccountTreeIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("branch");
                }}
                open={opened[5].isOpen}
              >
                <Item
                  title="Create New Branch"
                  to="/branch/createBranch"
                  icon={<AddchartIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Branch List"
                  to="/branch/branchList"
                  icon={<ReceiptLongIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu>
              )}

              {/* Department */}
              {roles == 2 && (
              <SubMenu
                title="Manage Department"
                icon={<AccountTreeIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("department");
                }}
                open={opened[6].isOpen}
              >
                <Item
                  title="Create New Department"
                  to="/department/createDepartment"
                  icon={<AddchartIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Department List"
                  to="/department/departmentList"
                  icon={<ReceiptLongIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu>
              )}

              {/* Grade */}
              {roles == 2 && (
              <SubMenu
                title="Manage Grade"
                icon={<AccountTreeIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("grade");
                }}
                open={opened[7].isOpen}
              >
                <Item
                  title="Create New Grade"
                  to="/grade/createGrade"
                  icon={<AddchartIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Grade List"
                  to="/grade/gradeList"
                  icon={<ReceiptLongIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu>
              )}

              {/* Designation */}
              {roles == 2 && (
              <SubMenu
                title="Manage Designation"
                icon={<AccountTreeIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("designation");
                }}
                open={opened[8].isOpen}
              >
                <Item
                  title="Create New Designation"
                  to="/designation/createDesignation"
                  icon={<AddchartIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Designation List"
                  to="/designation/designationList"
                  icon={<ReceiptLongIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu>

              )}

              {/* Employees */}
              {roles == 2 && (
              <SubMenu
                title="Manage Employees"
                icon={<AccountTreeIcon />}
                style={{
                  color: colors.grey[100],
                }}
                onOpenChange={() => {
                  handleChange("employees");
                }}
                open={opened[9].isOpen}
              >
                <Item
                  title="Create New Employee"
                  to="/employees/createEmployee"
                  icon={<AddchartIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
                <Item
                  title="Employee List"
                  to="/employees/employeeList"
                  icon={<ReceiptLongIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  change={change}
                  width={width}
                />
              </SubMenu>
              )}
              
              {/* Leave */}
              {
              // (roles != 1) &&
                <SubMenu
                  title="Leave Application"
                  icon={<AccountTreeIcon />}
                  style={{
                    color: colors.grey[100],
                  }}
                  onOpenChange={() => {
                    handleChange("application");
                  }}
                  open={opened[10].isOpen}
                >
                  <Item
                    title="Create New Application"
                    to="/application/leave-application"
                    icon={<AddchartIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />
                  <Item
                    title="Applied Application"
                    to="/application/applied-list"
                    icon={<ReceiptLongIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />
               {/*   <Item
                    title="Leave Application Form"
                    to="/application/leave-form"
                    icon={<ReceiptLongIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />
              */}
                  <Item
                    title="Pending Recorder"
                    to="/application/pending-recorder"
                    icon={<ReceiptLongIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />

                  
                  <Item
                    title="Pending Approver"
                    to="/application/pending-approver"
                    icon={<ReceiptLongIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />
                {
                  // (roles !=3) && 
                  
                  <Item
                    title="Advance Report"
                    to="/application/advance-report"
                    icon={<ReceiptLongIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />
                }
                </SubMenu>
              }

              <SubMenu
                  title={name}
                  icon={<AccountTreeIcon />}
                  style={{
                    color: colors.grey[100],
                  }}
                  onOpenChange={() => {
                    handleChange("employee");
                  }}
                  open={opened[11].isOpen}
                >
                  <Item
                    title="Message Box"
                    to="/application/messageBox"
                    icon={<ReceiptLongIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />

                  <Item
                    title="create new application"
                    to="/application/leave-application"
                    icon={<AddchartIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />

                  <Item
                    title="My Application"
                    to="/application/pending-recorder"
                    icon={<ReceiptLongIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    change={change}
                    width={width}
                  />

                  <SubMenu
                    title="Task as Recorder"
                    icon={<AccountTreeIcon />}
                    style={{
                      color: colors.grey[100],
                    }}
                  >
                    <Item
                      title="Process Application"
                      to=""
                      icon={<ReceiptLongIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      change={change}
                      width={width}
                    />
                    <Item
                      title="Application Status"
                      to=""
                      icon={<ReceiptLongIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      change={change}
                      width={width}
                    />
                  </SubMenu>
                  <SubMenu
                    title="Task Approver"
                    icon={<AccountTreeIcon />}
                    style={{
                      color: colors.grey[100],
                    }}
                  >
                    <Item
                      title="Pending for Approval"
                      to=""
                      icon={<ReceiptLongIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      change={change}
                      width={width}
                    />
                    <Item
                      title="Processed Application"
                      to=""
                      icon={<ReceiptLongIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      change={change}
                      width={width}
                    />
                  </SubMenu>
                
                </SubMenu>

              {(roles == 1) &&
                <Item
                title="Activity"
                to="/activity/log"
                icon={<VpnKeyIcon />}
                selected={selected}
                setSelected={setSelected}
                change={change}
                width={width}
                />
              }
            </Box>
          </Menu>
          <hr />
        </ProSidebar>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
 
  return {
    name: state.auth.name,
    roles: state.auth.roles,
    company: state.auth.company,
    isCollapsed: state.collapse.isCollapse,
  };
};

export default connect(mapStateToProps)(Sidebar);
