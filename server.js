const bodyParser = require("body-parser");
const { text } = require("body-parser");
const fs = require("fs");
const express = require("express");
const path = require("path");
const noteList = require("./db/db.json");

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

app.get("/api/notes/:noteList", (req, res) => {
  const selected = req.params.noteList;
  console.log(selected);
  console.log(noteList[0].title);
  for (let i = 0; i < noteList.length; i++) {
    if (selected == noteList[i].title) {
      return res.json(noteList[i]);
    }
  }
  return res.json(false);
});

app.get("/api/notes", (req, res) => res.json(noteList));

app.post("/api/notes", (req, res) => {
  const data = fs.readFileSync("db/db.json");
  const noteList = JSON.parse(data);
  const newNote = req.body;
  noteList.push(newNote);
  const updatedNotes = JSON.stringify(noteList);
  fs.writeFile("db/db.json", updatedNotes, (err) => {
    if (err) throw err;
  });
  res.end("post successful");
});

app.delete("/api/notes/:noteList", (req, res) => {
  /*for (let i = 0; i < noteList.length; i++) {
    if (deletedNote === noteList[i].title) {
      noteList.splice(deletedNote, 1);
    }
  }*/
});

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`));
