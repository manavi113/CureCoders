// // 4000003560000008


import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// ✅ Correct slice import
import { createAppointment, clearErrors } from "../../bookapp";

import "./payment.css";

const Payment = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const doctor = location.state?.doctor;
  const [appointmentInfo, setAppointmentInfo] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { error, appointment } = useSelector((state) => state.appointment);

const appointmentInfoFromState = location.state?.appointmentInfo;


// useEffect(() => {
//   if (!appointmentInfoFromState) {
//     // fallback to sessionStorage or redirect
//     const info = sessionStorage.getItem("appointmentInfo");
//     if (info) {
//       setAppointmentInfo(JSON.parse(info));
//     } else {
//       navigate("/book");
//     }
//   }
// }, [appointmentInfoFromState, navigate]);
const patientInfo = location.state?.patientInfo || JSON.parse(sessionStorage.getItem("patientInfo"));

useEffect(() => {
  if (!doctor || !patientInfo) {
    navigate("/book");
  } else {
    setAppointmentInfo(patientInfo); // ✅ Set it here
  }
}, [doctor, patientInfo, navigate]);

  useEffect(() => {
    if (!user || !user.name || !user.email) {
      toast.error("User information is missing. Please log in again.");
      navigate("/login");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (appointment) {
      toast.success("Appointment booked successfully!");
      navigate("/dashboard");
    }
  }, [error, appointment, dispatch, navigate, user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!appointmentInfo) {
      toast.error("Appointment information missing.");
      return;
    }

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const paymentData = {
        amount: Math.round(doctor.fees * 100),
      };

      const { data } = await axios.post("/api/v1/payment/process", paymentData, config);

      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        payBtn.current.disabled = false;
        toast.error("Stripe.js has not loaded yet.");
        return;
      }

      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        payBtn.current.disabled = false;
        toast.error("Payment form is not properly set up.");
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // ✅ Dispatch create appointment
          const appointmentData = {
            doctor: {
              name: doctor?.name,
              specialty: doctor?.specialty,
              fees: doctor?.fees,
            },
            fees: doctor?.fees,
            timing: `${appointmentInfo.date} ${appointmentInfo.time}`,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            },
          };

          dispatch(createAppointment(appointmentData));
        } else {
          toast.error("Payment processing issue occurred.");
          payBtn.current.disabled = false;
        }
      }
    } catch (err) {
      payBtn.current.disabled = false;
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  if (!appointmentInfo) return <p>Loading appointment info...</p>;

  return (
    <Fragment>
      <MetaData title="Payment" />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${doctor && doctor.fees ? Number(doctor.fees).toFixed(2) : "0.00"}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Payment;
