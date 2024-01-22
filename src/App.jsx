/**
 * Copyright © 2023, Vendor CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Vendor CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Vendor CRM.
*/

import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useIdleTimer } from 'react-idle-timer';

import { ColorModeContext, useMode } from "./theme";
// import Login from "./components/login/Login";
import Topbar from "./components/common/Topbar";
import Sidebar from "./components/common/Sidebar";
import Loader from "./components/common/Loader";
import { Utility } from "./components/utility";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

const VendorFormComponent = lazy(() => import("./components/vendor/FormComponent"));
const VendorListingComponent = lazy(() => import("./components/vendor/ListingComponent"));
const ProductFormComponent = lazy(() => import("./components/product/FormComponent"));
const ProductListingComponent = lazy(() => import("./components/product/ListingComponent"));
const WarehouseFormComponent = lazy(() => import("./components/warehouse/FormComponent"));
const WarehouseListingComponent = lazy(() => import("./components/warehouse/ListingComponent"));
const InventoryFormComponent = lazy(() => import("./components/inventory/FormComponent"));
const InventoryListingComponent = lazy(() => import("./components/inventory/ListingComponent"));

function App() {
  const [theme, colorMode] = useMode();
  const navigateTo = useNavigate();

  // const { pathname } = useLocation();
  // const { getLocalStorage, getRoleAndPriorityById, verifyToken } = Utility();

  const onIdle = () => {
    localStorage.clear();
    location.reload();
  };

  useIdleTimer({    //Automatically SignOut when a user is inactive for 30 minutes
    onIdle,
    timeout: parseInt(import.meta.env.VITE_LOGOUT_TIMER)    //30 minute idle timeout stored in environment variable file
  });

  // useEffect(() => {
  //   getRoleAndPriorityById()
  //     .then(result => {
  //       console.log(result, 'useeffect 1')
  //       if (result) {
  //         setUserRole({
  //           name: result.name,
  //           priority: result.priority
  //         });
  //       }
  //     });
  // }, [getLocalStorage("auth")?.role])

  // useEffect(() => {
  //   verifyToken()
  //     .then(result => {
  //       console.log('useeffect2', !result)
  //       if (!result && pathname !== '/login') {
  //         localStorage.clear();
  //         navigateTo('../login', { replace: true });
  //       }
  //     })
  // }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* {getLocalStorage("auth")?.token && */}
          <Suspense fallback={<Loader />}>
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route exact path="/" element={<Dashboard />} />

                <Route exact path="/vendor/create" element={<VendorFormComponent />} />
                <Route exact path="/vendor/update/:id" element={<VendorFormComponent />} />
                <Route exact path="/vendor/listing" element={<VendorListingComponent />} />

                <Route exact path="/product/create" element={<ProductFormComponent />} />
                <Route exact path="/product/update/:id" element={<ProductFormComponent />} />
                <Route exact path="/product/listing" element={<ProductListingComponent />} />

                <Route exact path="/warehouse/create" element={<WarehouseFormComponent />} />
                <Route exact path="/warehouse/update/:id" element={<WarehouseFormComponent />} />
                <Route exact path="/warehouse/listing" element={<WarehouseListingComponent />} />

                <Route exact path="/inventory/create" element={<InventoryFormComponent />} />
                <Route exact path="/inventory/update/:id" element={<InventoryFormComponent />} />
                <Route exact path="/inventory/listing" element={<InventoryListingComponent />} />
              </Routes>
            </main>
          </Suspense>
          {/* <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
