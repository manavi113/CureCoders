import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointments } from "../../bookapp";
import Loader from "../layout/Loader/Loader"; // optional
import "./appointments.css";
import { createMeetingRoom } from '../../meetSlice';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const dispatch = useDispatch();

  const { myAppointments, loading, error } = useSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);
   const [joinRoomId, setJoinRoomId] = useState('');
    const navigate = useNavigate();
  
    // const { roomId } = useSelector((state) => state.meeting);
    const roomId = useSelector((state) => state.meeting?.roomId);

  
    const handleCreateMeeting = () => {
      dispatch(createMeetingRoom());
    };
  
    const handleJoinMeeting = () => {
      if (joinRoomId.trim()) {
        navigate(`/room/${joinRoomId}`);
      } else {
        alert('Please enter a Room ID to join.');
      }
    };
  
    useEffect(() => {
      if (roomId) {
        navigate(`/room/${roomId}`);
      }
    }, [roomId, navigate]);

  return (
    <div className="appointmentsPage">
      <h2>My Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : myAppointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="appointmentList">
          {myAppointments.map((appointment) => (
            <li key={appointment._id} className="appointmentItem">
              <strong>Date/Time:</strong> {appointment.timing}<br />
              <strong>Doctor:</strong> {appointment.doctor?.name || "N/A"}<br />
              <strong>Fees:</strong> ₹{appointment.fees}<br />
              <strong>Status:</strong> {appointment.paymentInfo?.status}
            </li>
          ))}
        </ul>
      )}
     {myAppointments.some(app => app.paymentInfo?.status === "succeeded") && (
      <div className="home-container">
      <h1>Welcome to QuickMeet</h1>

      {/* Create Meeting Button */}
      <button onClick={handleCreateMeeting} disabled={loading}>
        {loading ? 'Creating...' : 'Create New Meeting'}
      </button>

      {/* Join Meeting Input + Button */}
      <div className="join-section">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value)}
          />
        <button onClick={handleJoinMeeting}>Join a Meeting</button>
      </div>

      {/* Error Display */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
        )}
    </div>
    
  );
};

export default MyAppointments;
