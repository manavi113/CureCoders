import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SelectDoctor() {
  const location = useLocation();
  const { patientInfo } = location.state || {};
  const navigate = useNavigate();
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const selectedSpecialty = queryParams.get("specialty");

  // Mock data
  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Cardiology",
      experience: "10 years",
      hospital: "Apollo Hospital",
    },
    {
      id: 2,
      name: "Dr. Rohit Mehta",
      specialty: "Dermatology",
      experience: "8 years",
      hospital: "Max Healthcare",
    },
    {
      id: 3,
      name: "Dr. Anjali Desai",
      specialty: "Cardiology",
      experience: "12 years",
      hospital: "Fortis Hospital",
    },
    {
      id: 3,
      name: "Dr. Anjali Desai",
      specialty: "Neurology",
      experience: "12 years",
      hospital: "Fortis Hospital",
    },
  ];

  useEffect(() => {
    const filtered = doctors.filter(
  (doc) => doc.specialty.toLowerCase() === selectedSpecialty?.toLowerCase()
);
setFilteredDoctors(filtered);
  }, [selectedSpecialty]);

  const handleDoctorSelect = (doctor) => {
    alert("Redirecting to payment page");
    navigate("/payment", { state: { doctor, patientInfo } });
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Available Doctors - {selectedSpecialty}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="p-4 border rounded-lg shadow hover:shadow-md"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              {doctor.name}
            </h3>
            <p className="text-gray-700">Specialty: {doctor.specialty}</p>
            <p className="text-gray-600">Experience: {doctor.experience}</p>
            <p className="text-gray-600">Hospital: {doctor.hospital}</p>
            <button
              onClick={() => handleDoctorSelect(doctor)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Select Doctor
            </button>
          </div>
        ))}
        
      </div>
    </div>
  );
}
