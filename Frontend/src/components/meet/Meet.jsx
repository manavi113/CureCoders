import React, { useEffect, useRef, useState } from 'react';
import './Meet.css'
import { useNavigate, useParams } from 'react-router-dom';
import socket from './socket'; // Your socket.io client instance
import SimplePeer from 'simple-peer';
import { useSelector } from 'react-redux';
const Meet = () => {
  const { user } = useSelector((state) => state.user);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const myVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
const [otherUserName, setOtherUserName] = useState('');

  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hostId, setHostId] = useState(null);
  const [mySocketId, setMySocketId] = useState(null);

  const toggleAudio = () => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoMuted(!videoTrack.enabled);
    }
  };
  const leaveMeeting = () => {
    navigate('/');
  };

  const endMeeting = () => {
    socket.emit('endMeeting', roomId);
    navigate('/');
  };
  useEffect(() => {

    // Create a SimplePeer instance
    const createPeer = (otherUserId, localStream, initiator) => {
      if (!localStream) {
        console.error('Stream not available when trying to create peer.');
        return null;
      }

      const peer = new SimplePeer({
        initiator,
        trickle: false,
        stream: localStream,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
          ]
        }
      });

      peer.on('signal', signalData => {
        if (initiator) {
          socket.emit('sendSignal', {
            userToSignal: otherUserId,
            signal: signalData,
          });
        } else {
          socket.emit('returnSignal', {
            signal: signalData,
            to: otherUserId,
          });
        }
      });

      peer.on('stream', incomingStream => {
        setRemoteStream(incomingStream);
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = incomingStream;
        }
      });

      peer.on('error', err => console.error('Peer error:', err));
      peer.on('connect', () => console.log('Peer connected'));
      peer.on('close', () => console.log('Peer connection closed'));

      // Monitor connection state
      peer._pc.onconnectionstatechange = () => {
        console.log('Connection state:', peer._pc.connectionState);
        if (peer._pc.connectionState === 'failed') {
          console.error('Connection failed');
        }
      };

      return peer;
    };



    // 1. Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;    // Save stream in ref for cleanup & peer creation
        setMyStream(stream);

        if (myVideo.current) myVideo.current.srcObject = stream;

        // 2. Join the room on the server
        socket.emit('joinRoom', { roomId, name: user?.name });

        // 3. When a new user joins, create peer as initiator
        socket.on('userJoined', (userSocketId) => {
          if (peerRef.current) return; // prevent multiple peers
          console.log('User joined:', userSocketId);
          const peer = createPeer(userSocketId, streamRef.current, true);
          if (peer) peerRef.current = peer;
        });

        // 4. When receiving a signal from another user, create peer as receiver and signal back
        socket.on('receiveSignal', ({ signal, from }) => {
          if (peerRef.current) return; // prevent multiple peers
          console.log('Received signal from', from);
          const peer = createPeer(from, streamRef.current, false);
          if (peer) {
            peer.signal(signal);
            peerRef.current = peer;
          }
        });

        // 5. When other user returns their signal, signal the peer
        socket.on('returnedSignal', ({ signal }) => {
          console.log('Received returned signal');
          if (peerRef.current) {
            peerRef.current.signal(signal);
          }
        });

        // 6. Listen for incoming chat messages
        socket.on('receiveMessage', ({ sender, text }) => {
          setMessages(prev => [...prev, { sender, text }]);
        });

        socket.emit('getMyId');
        socket.on('yourId', id => setMySocketId(id));

       socket.emit('joinRoom', { roomId, name: user?.name });
        socket.on('hostAssigned', host => setHostId(host));

        socket.on('meetingEnded', () => {
          alert("Meeting ended by host");
          window.location.href = "/";
        });



      })



      .catch((err) => {
        console.error('Error accessing media devices.', err);
      });

    // Cleanup on unmount
    return () => {
      socket.off('userJoined');
      socket.off('receiveSignal');
      socket.off('returnedSignal');
      socket.off('receiveMessage');
      socket.off('yourId');
      socket.off('hostAssigned');
      socket.off('meetingEnded');

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
    };
  }, [roomId]);

  // Send chat message function
  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, { sender: 'Me', text: newMessage }]);
      socket.emit('sendMessage', {
        roomId,
        message: newMessage,
        sender: 'Me'
      });
      setNewMessage('');
    }
  };


  return (
    <div className="meeting-container">
      <h2 className="meeting-header">Meeting Room: {roomId}</h2>

      <div className="video-section">
        <div className="video-box">
          <p><strong>Your Video</strong></p>
          <video ref={myVideo} autoPlay muted playsInline />
        </div>
        <div className="video-box">
          <p><strong>Other User</strong></p>
          <video ref={remoteVideo} autoPlay playsInline />
        </div>
      </div>

      <div className="controls">
        <button onClick={toggleAudio}>
          {isAudioMuted ? 'Unmute Mic' : 'Mute Mic'}
        </button>
        <button onClick={toggleVideo}>
          {isVideoMuted ? 'Turn On Camera' : 'Turn Off Camera'}
        </button>
        {/* <button onClick={leaveMeeting}>Leave Meeting</button>
        <button onClick={endMeeting} style={{ backgroundColor: 'red', color: 'white' }}>
          End Meeting
        </button> */}
        {/* {hostId && (
          <p><strong>Host:</strong> {hostId === mySocketId ? 'You' : hostId}</p>
        )}
        {mySocketId === hostId && (
          <button onClick={endMeeting} style={{ background: 'red', color: 'white' }}>
            End Meeting
          </button>
        )} */}
        {hostId && (
  <p><strong>Host:</strong> {hostId === mySocketId ? 'You' : hostId}</p>
)}

{mySocketId === hostId ? (
  <button onClick={endMeeting} style={{ backgroundColor: 'red', color: 'white' }}>
    End Meeting
  </button>
) : (
  <button onClick={leaveMeeting} style={{ backgroundColor: 'gray', color: 'white' }}>
    Leave Meeting
  </button>
)}


      </div>

      <div className="chat-container">
        <h3>Chat</h3>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Meet;
