//mongodb+srv://<saif>:<saif>@cluster0.fgfnu.gcp.mongodb.net/social-network?retryWrites=true&w=majority

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 9000;
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1178826",
  key: "2199f1671725b34159f8",
  secret: "311f61c39f18166c5757",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("db is connected");
  const msgCollection = db.collection("messages");

  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log("Change Occured");

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        _id: messageDetails._id,
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

const connection_url =
  "mongodb+srv://admin:admin@cluster0.pnvh0.mongodb.net/whatsapp?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

// middeware
app.use(express.json());
app.use(require("cors")());
// import Models
const Messages = require("./dbMessages");

// api routes
app.get("/messages/sync", (req, res) => {
  const dbMessage = req.body;
  Messages.find(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new Message created: \n ${data}`);
    }
  });
});

app.get("/", (req, res) => res.status(200).send("Hello world"));

app.listen(port, console.log("Server running on " + port));
