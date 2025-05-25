import React, { Fragment } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate("/shipping");
    };

    return (
        <Fragment>
            <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button onClick={checkoutHandler}>Check Out</button>
                </div>
            </div>
    </Fragment >
  );
};

export default Cart;
