import { useEffect, useState } from "react";
<<<<<<< HEAD
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
=======
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)

export default function ShowDoctors() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const specialty = queryParams.get("specialty");
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!specialty) return;

<<<<<<< HEAD
    console.log("Sending request for:", specialty);
    axios
      .get(`http://localhost:3000/api/doctors/doctorfetch`, {
        params: { specialty },
      })
      .then((res) => {
        console.log("Response from backend:", res.data);
        console.log("Doctors received count:", res.data.length);
=======
    axios
      .get(`http://localhost:3001/api/doctors/doctorfetch`, {
        params: { specialty },
      })
      .then((res) => {
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
<<<<<<< HEAD
        console.error("Fetch error:", err);
=======
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
        setError("Error fetching doctors");
        setLoading(false);
      });
  }, [specialty]);

  if (loading) return <div>Loading doctors...</div>;
  if (error) return <div>{error}</div>;
  if (doctors.length === 0)
    return <div>No doctors found for "{specialty}"</div>;

<<<<<<< HEAD
=======
  // Doctor pe click hone pe uska data payment page ko bhejne ka function
const handleBookAppointment = (doctor) => {
const patientInfo = location.state?.patientInfo || JSON.parse(sessionStorage.getItem("patientInfo"));
  if (!patientInfo) {
    // Maybe alert user or redirect back
    alert("Patient info missing, please fill the consultation form.");
    // navigate("/book");
    return;
  }
  navigate("/process/payment", { state: { doctor, patientInfo } });
};

>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-capitalize">
        Doctors specialized in {specialty}
        <div className="fs-6 text-secondary">
          Total doctors found: {doctors.length}
        </div>
      </h2>

      <div className="row g-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{
                borderRadius: "16px",
                padding: "16px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">{doc.name}</h5>
                <h6 className="card-subtitle mb-3 text-muted">
                  {doc.qualification}
                </h6>
<<<<<<< HEAD

=======
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
                <p className="card-text mb-2">
                  <strong>Experience:</strong> {doc.experience} years
                </p>
                <p className="card-text mb-2">
                  <strong>Specialization:</strong> {doc.specialization}
                </p>
                <p className="card-text mb-2">
                  <strong>Fees:</strong> ₹{doc.fees}
                </p>
                <p className="card-text mb-3">
                  <strong>Timings:</strong> {doc.timings}
                </p>

                <button
                  className="btn btn-sm btn-outline-primary mt-auto align-self-start"
                  style={{
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    padding: "6px 12px",
                  }}
<<<<<<< HEAD
=======
                  onClick={() => handleBookAppointment(doc)}
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
