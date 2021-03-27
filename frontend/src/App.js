import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./App.css";
import Pusher from "pusher-js";
import axios from "./axios";
// import Scroll from "./scroll";
function App() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessage(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("2199f1671725b34159f8", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      // console.log(JSON.stringify(newMessage));
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    });

    // cleanup
    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, []);

  console.log(message);

  return (
    <div className="app">
      <div className="app__body">
        {/* <Scroll /> */}
        <Sidebar />
        <Chat messages={message} />
      </div>
    </div>
  );
}

export default App;
