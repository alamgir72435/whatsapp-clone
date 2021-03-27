import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Chat.css";
import { InsertEmoticon } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
import { Element, animateScroll as scroll } from "react-scroll";
const Chat = ({ messages }) => {
  const [message, setMessage] = useState("");
  // const chat__body = useRef();
  const chat__body__scroll = () => {
    scroll.scrollToBottom();
  };

  useEffect(() => {
    chat__body__scroll();
  }, []);

  const sendMessage = async (e) => {
    window.scrollTo(0, 1000);
    e.preventDefault();
    await axios.post("/messages/new", {
      message: message,
      name: "Alamgir ahamed",
      timestamp: Date.now().toString(),
      received: true,
    });
    setMessage("");
    chat__body__scroll();
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <Element>
          {messages.map((message, index) => (
            <p
              key={index + 1}
              className={`chat__message ${
                message.received && "chat__reciever"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          ))}
        </Element>

        {/* chat__reciever */}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
