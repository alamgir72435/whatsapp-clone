import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Chat.css";
import { InsertEmoticon } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
const Chat = () => {
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
        <p className="chat__message">
          <span className="chat__name">Alamgir</span>
          This is a Message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message chat__reciever">
          <span className="chat__name">Alamgir</span>
          This is a Message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Alamgir</span>
          This is a Message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input placeholder="Type a message" />
          <button>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
