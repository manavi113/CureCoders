import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
const location = useLocation();
const { doctor, patientInfo } = location.state || {};

  const navigate = useNavigate();

  if (!doctor) {
    return (
      <div className="p-6 text-center text-red-600">
        No doctor selected. Please go back and choose a doctor.
      </div>
    );
  }

  const handlePayment = () => {
    alert("Payment Successful!");
    navigate("/consultation"); 
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Payment for Consultation
      </h2>
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
  <h3 className="text-lg font-semibold text-blue-700 border-b pb-2">
    Appointment Summary
  </h3>

  <div className="space-y-1">
    <p><span className="font-medium text-gray-700">Patient Name:</span> {patientInfo.name}</p>
    <p><span className="font-medium text-gray-700">Email:</span> {patientInfo.email}</p>
    <p><span className="font-medium text-gray-700">Phone:</span> {patientInfo.phone}</p>
    <p><span className="font-medium text-gray-700">Appointment Date & Time:</span> {patientInfo.date} at {patientInfo.time}</p>
  </div>

  <div className="border-t pt-4 space-y-1">
    <p><span className="font-medium text-gray-700">Doctor:</span> {doctor.name}</p>
    <p><span className="font-medium text-gray-700">Specialty:</span> {doctor.specialty}</p>
    <p><span className="font-medium text-gray-700">Hospital:</span> {doctor.hospital}</p>
    <p><span className="font-medium text-gray-700">Consultation Fee:</span> ₹500</p>
  </div>
</div>
      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Pay with Razorpay
      </button>
    </div>
  );
}
