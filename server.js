const { text } = require("body-parser");
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(noteList));

const noteList = [
  {
    Notetitle: "Howdy",
    noteText: "Planet",
  },
];

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`));
