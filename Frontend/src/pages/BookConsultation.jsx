import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

=======
// import CheckoutSteps from "../components/Cart/CheckoutSteps";
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
export default function BookConsultation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    specialty: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
   navigate(`/doctors?specialty=${formData.specialty.toLowerCase()}`, {
  state: { patientInfo: formData }
});
  };
=======
//   const handleSubmit = (e) => {
//     e.preventDefault();
//    navigate(`/doctors?specialty=${formData.specialty.toLowerCase()}`, {
//   state: { patientInfo: formData }
// });
//   };
const handleSubmit = (e) => {
  e.preventDefault();
  sessionStorage.setItem("patientInfo", JSON.stringify(formData));
  navigate(`/doctors?specialty=${formData.specialty.toLowerCase()}`, {
    state: { patientInfo: formData }
  });
};

>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Book a Consultation</h2>
<<<<<<< HEAD
=======
      {/* <CheckoutSteps activeStep={0} /> */}
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="symptoms"
          placeholder="Describe your symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <select
          name="specialty"
          required
          value={formData.specialty}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Specialty</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Neurology">Neurology</option>
          <option value="Psychiatry">Psychiatry</option>
          <option value="Ophthalmology">Ophthalmology</option>
          <option value="Gynecology">Gynecology</option>
          <option value="ENT">ENT (Ear, Nose, Throat)</option>
          <option value="Gastroenterology">Gastroenterology</option>
        </select>
        <label className="text-sm font-medium">Choose Date</label>
        <input
          type="date"
          name="date"
          required
          placeholder="Choose Date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <label className="text-sm font-medium">Choose Time</label>
        <input
          type="time"
          name="time"
          placeholder="Choose Time"
          required
          value={formData.time}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
                
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"  >
          Continue
        </button>
      </form>
    </div>
  );
}