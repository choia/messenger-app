import { UserRoom, Messages } from "./types";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../contexts/SocketContext"
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";


const Chat = ({ username, room }: UserRoom) => {
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // listen on changes so we can update messages
    if (flag) {
      socket?.on("receive_message", (data) => {
        console.log(data)
        setMessages((messages) => [...messages, data]);
      })
    }

  }, [flag]);

  const handleMessageClick = () => {
    if (message !== "") {
      const messageData =  {
        username: username,
        room: room,
        message: message,
        time: moment(new Date()).format("h:mma")
      }
      setFlag(true);
      socket?.emit("send_message", (messageData));
      setMessages((messages) => [...messages, messageData]);
      setMessage("");
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <p>User: <span>{ username }</span></p>
        <p>Room: <span>{ room }</span></p>
      </div>
      <div className="chat-content">
        <ScrollToBottom className="chat-message">
          {messages.map((messageContent, index) => {
            return (
              <div
                className="message"
                key={index}
                id={username === messageContent.username ? "currentuser": "otheruser"}
                >
                <div className="message-top">
                  <span id="username">{messageContent.username}</span>
                  <span id="time">{messageContent.time}: </span>
                </div>
                <div className="message-bottom">
                  {messageContent.message}
                </div>
              </div>
            )
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Hi..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={handleMessageClick}>Send</button>
      </div>
    </div>
  );
}

export default Chat;