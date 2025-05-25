 
<<<<<<< HEAD
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './index.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookConsultation from "./pages/BookConsultation";
// import SelectDoctor from "./pages/SelectDoctor";
import Payment from "./pages/Payment";
import Consultation from "./pages/Consultation";
import Profile from "./pages/Profile";
import {Navbar} from "./components/Navbar";
=======
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './index.css'
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BookConsultation from "./pages/BookConsultation";
// import SelectDoctor from "./pages/SelectDoctor";
import Consultation from "./pages/Consultation";
import Navbar from "./components/Navbar"; 
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
import Footer from "./components/Footer";
import ChatBot from "./Components/Chatbot/ChatBot";
import ShowDoctors from "./pages/ShowDoctors";

<<<<<<< HEAD
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book" element={<BookConsultation />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/consultation" element={<Consultation />} />
          {/* <Route path="/select-doctor" element={<SelectDoctor />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbot" element={<ChatBot />} />
           <Route path="/doctors" element={<ShowDoctors />} />
        </Routes>
       </div>
        <Footer />
      </div>
    </Router>
=======
import { loadUser } from "./userSlice.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate } from "react-router-dom";
import axios from "axios";
import store from "./store.jsx";
import LoginSignUp from "./components/User/LoginSignUp.jsx";
// DB_URI="mongodb+srv://chhaviKas07:shubhikashyap@cluster0.ppzqq6r.mongodb.net/ecommerce"
// import Meet from './component/meet/Meet.jsx';
import Room from './components/meet/Room.jsx';

import Payment from "./components/Cart/Payment.jsx";   
// import Home from "./component/Home/Home.jsx"; 
import UserOptions from "./components/layout/Header/UserOptions.jsx";
import Profile from "./components/User/Profile.jsx";  
import ProtectedRoute from "./components/Route/ProtectedRoute.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx"; 
import UpdatePassword from "./components/User/UpdatePassword.jsx";  
import ForgotPassword from "./components/User/ForgotPassword.jsx"; 
import ResetPassword from "./components/User/ResetPassword.jsx";  
import Cart from "./components/Cart/Cart.jsx";  
import MyAppointments from "./components/User/MyAppointments.jsx";
// import Shipping from "./component/Cart/Shipping.jsx";  
// import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";  
// import OrderSuccess from "./component/Cart/OrderSuccess.jsx";  
// import MyOrders from "./component/Order/MyOrders.jsx";   
// import OrderDetails from "./component/Order/OrderDetails.jsx";  
// import Dashboard from "./component/Admin/Dashboard.jsx";  
// import OrderList from "./component/Admin/OrderList.jsx";   
// import ProcessOrder from "./component/Admin/ProcessOrder.jsx";  
// import UsersList from "./component/Admin/UsersList.jsx";   
// import UpdateUser from "./component/Admin/UpdateUser.jsx"; 


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const token = localStorage.getItem("token"); // or get it from Redux

      const { data } = await axios.get("/api/v1/stripeapikey", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Failed to get Stripe API Key:", error);
    }
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getStripeApiKey();
    }
  }, [isAuthenticated]);

  window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
<>
        <Navbar />
      {isAuthenticated && <UserOptions user={user} />}
 
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book" element={<BookConsultation />} />
          <Route path="/consultation" element={<Consultation />} />
          {/* <Route path="/select-doctor" element={<SelectDoctor />} /> */}
          <Route path="/chatbot" element={<ChatBot />} />
           <Route path="/doctors" element={<ShowDoctors />} />


        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/account" /> : <LoginSignUp />
          }
          
          />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
        </Route> 
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} /> 
        
        <Route path="/room/:roomId" element={<Room />} />
        {/* <Route path="/room/roomId" element={<Meet />} /> */}
        {/* <Route exact path="/shipping" element={<Shipping />} /> */}
        {/* <Route exact path="/order/confirm" element={<ConfirmOrder />} /> */}

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}
        <Route exact path="/myappointments" element={<MyAppointments />} />
        {/* <Route exact path="/success" element={<OrderSuccess />} />
        <Route exact path="/order/:id" element={<OrderDetails />} /> */}

        {/* <Route
          isAdmin={true}
          exact
          path="/admin/dashboard"
          element={<Dashboard />}
        />
        
        <Route
          exact
          path="/admin/orders"
          isAdmin={true}
          element={<OrderList />}
        />

        <Route
          exact
          path="/admin/users"
          isAdmin={true}
          element={<UsersList />}
        />

        <Route
          exact
          path="/admin/user/:id"
          isAdmin={true}
          element={<UpdateUser />}
        />


        <Route
          exact
          path="/admin/product/:id"
          isAdmin={true}
          element={<UpdateProduct />}
        />

        <Route
          exact
          path="/admin/order/:id"
          isAdmin={true}
          element={<ProcessOrder />}
        />

        <Route
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : <NotFound />
          }
        /> */}

      </Routes>
      
        <Footer />
</>
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
  );
 
 
}

export default App;