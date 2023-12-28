import Link from "next/link";

//redux imports
import { connect } from "react-redux";

//theme imports
import { tokens } from "./theme";
import {
  Typography,
  useTheme,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";

import { ProSidebarProvider } from "react-pro-sidebar";

//icons
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import FaceIcon from "@mui/icons-material/Face";
import BusinessIcon from "@mui/icons-material/Business";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ExtensionIcon from "@mui/icons-material/Extension";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

//mock data
import { dataset } from "../components/charts/data";
import { useState } from "react";
import BarChart from "../components/charts/BarChart";
import Tree from "../components/global/Tree"

export function Home({roles}) {
  // console.log("rolesrrr");
  // console.log(roles);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartData, setChartData] = useState({
    labels: dataset.map((data) => data.year),
    datasets: [
      {
        label: "Users gained",
        data: dataset.map((data) => data.gain),
        backgroundColor: [colors.greenAccent[300], colors.greenAccent[400]],
      },
    ],
  });

  return (
    <>
      <Typography variant="h1" color={colors.greenAccent[300]}>
        Welcome to Enterkey!
      </Typography>

      

      <div className="row">
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ShoppingBagIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Sales
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/orders/OrderList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
              <Link href="/orders/returnList" className="anchor">
                <Button size="small" variant="contained">
                  Returns
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ShoppingCartIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Purchases
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/purchases/purchaseList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
              <Link href="/purchases/returnList" className="anchor">
                <Button size="small" variant="contained">
                  Returns
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <FaceIcon fontSize="large" color="secondary" className="mb-3" />
              <Typography variant="h3" color={colors.primary[600]}>
                Customers
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/customers/customerList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <StoreIcon fontSize="large" color="secondary" className="mb-3"/>
              <Typography variant="h3" color={colors.primary[600]}>
                Vendors
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/vendors/vendorList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        
      </div>
      <div className="row">
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ReceiptIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Mushak
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/mushak/report" className="anchor">
                <Button size="small" variant="contained">
                  Report
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ReceiptIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                BOM
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/bom/bomList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
              <Link href="/bom/bomTemplate" className="anchor">
                <Button size="small" variant="contained">
                  Upload
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <AccountTreeIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Users
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/users/userList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <BusinessIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Companies
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/companies/companyList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        
        <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <AccountTreeIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Branches
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/branch/branchList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </div>
      
      <div className="row">
      <div className="col-md-2"></div>
          {/* {(roles == 1) &&
            <div className="col-md-8">
              <Card className="mt-5">
                <Tree />
              </Card>
            </div>
          } */}
        {/* <Tree /> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ExtensionIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Finished Goods
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/products/finishedGoodList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <FormatPaintIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Raw Materials
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/products/rawMaterialList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <DesignServicesIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Services
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/products/serviceList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
                  <BeachAccessIcon fontSize="large" color="secondary" className="mb-3"/>
                  <Typography variant="h3" color={colors.primary[600]}>
                    Accessories
                  </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/products/accessoriesList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
      </div>

      {/* <BarChart chartData={chartData} /> */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    name: state.auth.name,
    roles: state.auth.roles,
    company: state.auth.company,
    isCollapsed: state.collapse.isCollapse,
  };
};

// export default Home;
export default connect(mapStateToProps)(Home);
