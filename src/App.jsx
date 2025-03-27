import React from "react";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";

import RegisterPage from "./pages/User/RegisterPage";

import BeerForm from "./pages/Beer/BeerForm.jsx";
import LiquorForm from "./pages/Liquor/LiquorForm.jsx";
import CompanyList from "./pages/Company/CompanyList.jsx";
import HomePage from "./Homepage/HomePage.jsx";

import Navbar from "./components/Layout/Navbar.jsx";
import LoginPage from "./pages/User/LoginPage.jsx";
import BillRecords from "./pages/Bill/BillRecords.jsx";
import AdminHome from "./pages/Home/AdminHome.jsx";

const Layout = () => {
  return (
    <div className="pt-24">
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </div>
  );
};
import BeerBillForm from "./pages/Bill/BeerBillForm.jsx";
import LiquorList from "./pages/Liquor/LiquorList.jsx";
import BeerList from "./pages/Beer/BeerList.jsx";
import UpdateBeerForm from "./pages/Beer/UpdateBeerForm.jsx";
import UpdateLiquorForm from "./pages/Liquor/UpdateLiquorForm.jsx";
import LiquorBillForm from "./pages/Bill/LiquorBillForm.jsx";
import BillSelection from "./pages/Bill/BillSelection.jsx";
import CompanySelection from "./components/Company/CompanySelection.jsx";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage.jsx";
import ProfilePage from "./pages/User/ProfilePage.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import BillComponent from "./pages/Bill/BillComponent.jsx";
import BillDetails from "./pages/Bill/BillDetails.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import MonthlyAnalytics from "./pages/Analytics/MonthlyAnalytics.jsx";
import ProtectedRoutes from "./components/routes/ProtectedRoutes.jsx";
import Dashboard from "./pages/Home/Dashboard.jsx";
import CLBillForm from "./pages/CL2/CLBillForm.jsx";
import CLList from "./pages/CL2/CLList.jsx";
import UpdateCL from "./pages/CL2/UpdateCL.jsx";
import CLBillDetails from "./pages/CL2/CLBillDetails.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <>
              <ScrollToTop />
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route path="/dashboard/bill/details/:id" element={<BillDetails />} />
        <Route
          path="/dashboard/cl/bill/details/:id"
          element={<CLBillDetails />}
        />

        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard">
            <Route
              index
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="profile/:id"
              element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="bill/records"
              element={
                <ProtectedRoutes>
                  <BillRecords />
                </ProtectedRoutes>
              }
            />
            <Route
              path="liquor/:company"
              element={
                <ProtectedRoutes>
                  <LiquorList />
                </ProtectedRoutes>
              }
            />
            <Route
              path="beer/:company"
              element={
                <ProtectedRoutes>
                  <BeerList />
                </ProtectedRoutes>
              }
            />
            <Route
              path="cl/cllist"
              element={
                <ProtectedRoutes>
                  <CLList />
                </ProtectedRoutes>
              }
            />

            <Route
              path="cl/bill/create"
              element={
                <ProtectedRoutes>
                  <CLBillForm />
                </ProtectedRoutes>
              }
            />
            <Route
              path="beer/edit/:id"
              element={
                <ProtectedRoutes>
                  <UpdateBeerForm />
                </ProtectedRoutes>
              }
            />
            <Route
              path="cl/edit/:id"
              element={
                <ProtectedRoutes>
                  <UpdateCL />
                </ProtectedRoutes>
              }
            />
            <Route
              path="liquor/edit/:id"
              element={
                <ProtectedRoutes>
                  <UpdateLiquorForm />
                </ProtectedRoutes>
              }
            />
            <Route
              path="select"
              element={
                <ProtectedRoutes>
                  <BillSelection />
                </ProtectedRoutes>
              }
            />
            <Route
              path="company"
              element={
                <ProtectedRoutes>
                  <CompanyList />
                </ProtectedRoutes>
              }
            />
            <Route
              path="analytics"
              element={
                <ProtectedRoutes>
                  <AnalyticsPage />
                </ProtectedRoutes>
              }
            />

            <Route
              path="company/:companyType"
              element={
                <ProtectedRoutes>
                  <CompanySelection />
                </ProtectedRoutes>
              }
            />
            <Route
              path="bill/:id"
              element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              }
            />

            <Route
              path="beer/create/:company"
              element={
                <ProtectedRoutes>
                  <BeerForm />
                </ProtectedRoutes>
              }
            />
            <Route path="liquor/create/:company" element={<LiquorForm />} />
            <Route
              path="liquor/bill/create/:company"
              element={
                <ProtectedRoutes>
                  <LiquorBillForm />
                </ProtectedRoutes>
              }
            />
            <Route
              path="clbill"
              element={
                <ProtectedRoutes>
                  <CLBillForm />
                </ProtectedRoutes>
              }
            />
            <Route
              path="beer/bill/create/:company"
              element={
                <ProtectedRoutes>
                  <BeerBillForm />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
