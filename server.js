const bodyParser = require("body-parser");
const { text } = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const fs = require("fs");

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

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "db/db.json"))
);

app.post("/api/notes", (req, res) => {
  const data = fs.readFileSync("db/db.json");
  const notesList = JSON.parse(data);
  const newNote = req.body;
  notesList.push(newNote);
  const updatedNotes = JSON.stringify(notesList);
  fs.writeFile("db/db.json", updatedNotes, (err) => {
    if (err) throw err;
  });
});

/*app.delete("/api/notes", (req, res) => {
  const deletedNote = req.params.title;

  for (let i = 0; i < noteList.length; i++) {
    if (deletedNote === noteList[i].title) {
      noteList.splice(deletedNote, 1);
    }
  }
});*/

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`));
