import "./App.css";
import Chat from "./components/Chat";
import { useEffect, useState } from "react";
import { SocketContext } from "./contexts/SocketContext";
import io, { Socket } from "socket.io-client";

const SERVER_ENDPOINT: string = "http://localhost:3011";


function App() {
  const [socket, setSocket] = useState<Socket>();
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [showRoom, setShowroom] = useState<boolean>(false);

  useEffect(() => {
    setSocket(
      io(SERVER_ENDPOINT, {
        transports: ["websocket"]
      })
    );
  }, []);

  const handleRoomClick = () => {
    if (username !== "" && room !== "") {
      if (socket) {
        socket.emit("join_room", room);
      }
      setShowroom(true);
    }
  }

  return (
    <div className="App">
      <SocketContext.Provider value={{ socket }}>
        {!showRoom ? (
          <div className="app-container">
            <h2>Lets Chat!</h2>
            <input
              type="text"
              placeholder="Your Name..."
              onChange={(event) =>
                setUsername(event.target.value)}
            />
            <input
              type="text"
              placeholder="Room Name..."
              onChange={(event) =>
                setRoom(event.target.value)}
            />
            <button onClick={handleRoomClick}>Join</button>
          </div>
          ) : (
            <Chat username={username} room={room} />
        )}
      </SocketContext.Provider>
    </div>
  );
}

export default App;
