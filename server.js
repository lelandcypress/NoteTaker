const uniqid = require("uniqid");
const bodyParser = require("body-parser");
const { text } = require("body-parser");
const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes/:id", (req, res) => {
  const selected = req.params.id;
  console.log(selected);
  const data = fs.readFileSync(path.join(__dirname, "db/db.json"));
  const noteList = JSON.parse(data);
  console.log(noteList[0]);
  for (let i = 0; i < noteList.length; i++) {
    if (selected == noteList[i].id) {
      return res.json(noteList[i]);
    } else return res.json(false);
  }
});

app.get("/api/notes", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, "db/db.json"));
  res.json(JSON.parse(data));
});

app.post("/api/notes", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, "db/db.json"));
  const noteList = JSON.parse(data);
  const newNote = req.body;
  newNote.id = uniqid();
  console.log(newNote);
  noteList.push(newNote);
  const updatedNotes = JSON.stringify(noteList);
  fs.writeFile(path.join(__dirname, "db/db.json"), updatedNotes, (err) => {
    if (err) throw err;
    res.end("post successful");
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const deletedNote = req.params.id;
  console.log(deletedNote);
  const data = fs.readFileSync(path.join(__dirname, "db/db.json"));
  const noteList = JSON.parse(data);

  for (let i = 0; i < noteList.length; i++) {
    if (deletedNote === noteList[i].id) {
      noteList.splice(i, 1);
    }
  }
  const updatedNotes = JSON.stringify(noteList);
  fs.writeFile(path.join(__dirname, "db/db.json"), updatedNotes, (err) => {
    if (err) throw err;
    res.end("post successful");
  });
});

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`));
