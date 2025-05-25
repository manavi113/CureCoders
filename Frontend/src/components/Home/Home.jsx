// import React, { Fragment, useEffect } from "react";
// import "./Home.css";
// import { useDispatch, useSelector } from 'react-redux';
// import { createMeetingRoom } from '../../meetSlice';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { roomId, loading, error } = useSelector((state) => state.meeting);

//   const handleCreateMeeting = () => {
//     dispatch(createMeetingRoom());
//   };

//   React.useEffect(() => {
//     if (roomId) {
//       navigate(`/room/${roomId}`);
//     }
//   }, [roomId, navigate]);

//   return (
//     <div>
//       <button onClick={handleCreateMeeting} disabled={loading}>
//         {loading ? 'Creating...' : 'Create New Meeting'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from 'react-redux';
import { createMeetingRoom } from '../../meetSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [joinRoomId, setJoinRoomId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roomId, loading, error } = useSelector((state) => state.meeting);

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
  );
}

export default Home;
