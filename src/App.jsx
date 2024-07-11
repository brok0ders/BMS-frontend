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
    <>
      <Navbar />
      <Outlet />
    </>
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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={Contact} />
          <Route path="/dashboard">
            <Route index element={<AdminHome />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="bill/records" element={<BillRecords />} />
            <Route path="liquor/:company" element={<LiquorList />} />
            <Route path="beer/:company" element={<BeerList />} />
            <Route path="beer/edit/:id" element={<UpdateBeerForm />} />
            <Route path="liquor/edit/:id" element={<UpdateLiquorForm />} />
            <Route path="select" element={<BillSelection />} />
            <Route path="company" element={<CompanyList />} />
            <Route path="analytics" element={<AnalyticsPage />} />

            <Route path="company/:companyType" element={<CompanySelection />} />

            <Route path="beer/create/:company" element={<BeerForm />} />
            <Route path="liquor/create/:company" element={<LiquorForm />} />
            <Route
              path="liquor/bill/create/:company"
              element={<LiquorBillForm />}
            />
            <Route
              path="beer/bill/create/:company"
              element={<BeerBillForm />}
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
