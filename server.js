const bodyParser = require("body-parser");
const { text } = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/notes/:title", (req, res) => {
  const selected = req.params.notes;
  console.log(selected);
});

//app.get("/api/notes", (req, res) => res.json(noteList));

app.get("/api/notes", (req, res) => res.json(noteList));

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  noteList.push(newNote);
  res.json(newNote);
  console.log(noteList);
});

const noteList = [
  {
    title: "Hello",
    text: "Hello",
  },
];

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`));
