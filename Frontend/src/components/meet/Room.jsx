import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import socket from './socket';
import Meet from './Meet';

const Room = () => {
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    const handleUserJoined = (userId) => {
      console.log('A new user joined:', userId);
    };

    socket.on('userJoined', handleUserJoined);

    return () => {
      socket.off('userJoined', handleUserJoined);
    };
  }, [roomId]);

  return (
    <div>
      <h1>Meeting Room</h1>
      <p>Room ID: {roomId}</p>
      <Meet roomId={roomId} />
    </div>
  );
};

export default Room;
