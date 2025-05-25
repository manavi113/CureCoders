// import React from "react";
// import "./Header.css";
// import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../assets/logo.png";
// import { MdAccountCircle } from "react-icons/md";
// import { MdSearch } from "react-icons/md";
// import { MdAddShoppingCart } from "react-icons/md";

// const options = {
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
//   profileIcon: true,
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   ProfileIconElement: MdAccountCircle,
//   searchIcon: true,
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   SearchIconElement: MdSearch,
//   cartIcon: true,
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   CartIconElement: MdAddShoppingCart,
// };

// const Header = () => {
//   return <ReactNavbar {...options} />;
// };

// export default Header;
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="logo">MySite</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/meet">Meet</a></li>
        <li><a href="/room/:roomId">Room</a></li>
        <li><a href="/about">About</a></li>
         <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
      </ul>
    </nav>
  );
};

export default Header;
