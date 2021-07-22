const uniqid = require("uniqid"); //Assigns ID to POST request
const bodyParser = require("body-parser"); // Converts JSON file to HEX and back to a readable format
const { text } = require("body-parser");
const fs = require("fs"); // allows construction and rewritting of files
const express = require("express"); //imports Express.js
const path = require("path"); // allows us to normalize file paths.

const app = express();
const PORT = process.env.PORT || 3000;

//MiddleWare//
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routing//

//Get request landing page//
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

//serves up notes page//
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//retrieves db.json data//
app.get("/api/notes", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, "db/db.json"));
  res.json(JSON.parse(data));
});

//retrieves individual objects from db.json file, each object represents a note entry//
app.get("/api/notes/:id", (req, res) => {
  const selected = req.params.id;
  console.log(selected);
  const data = fs.readFileSync(path.join(__dirname, "db/db.json"));
  const noteList = JSON.parse(data);
  console.log(noteList[0]);
  //returns matching id parameter and returns it.
  for (let i = 0; i < noteList.length; i++) {
    if (selected === noteList[i].id) {
      return res.json(noteList[i]);
    } else return res.json(false);
  }
});

//POST Request//
app.post("/api/notes", (req, res) => {
  //retrieves current db.json data and converts it into an array of objects//
  const data = fs.readFileSync(path.join(__dirname, "db/db.json"));
  const noteList = JSON.parse(data);
  //reads the data from the POST Request//
  const newNote = req.body;
  //Generates a unique id for each POST request and appends it to each entry//
  newNote.id = uniqid();
  console.log(newNote);
  //New POST request, with random ID is added to the array and stringified to allow it to be written into JSON format//
  noteList.push(newNote);
  const updatedNotes = JSON.stringify(noteList);
  //JSON file is rewritten with updated array//
  fs.writeFile(path.join(__dirname, "db/db.json"), updatedNotes, (err) => {
    if (err) throw err;
    res.end("post successful");
  });
});

//Delete Request//
app.delete("/api/notes/:id", (req, res) => {
  //Notes page will send the ID parameter of the selected note, which is read into deletedNote//
  const deletedNote = req.params.id;
  console.log(deletedNote);
  //Retrieves current db.json data and converts it into an array of objects//
  const data = fs.readFileSync(path.join(__dirname, "db/db.json"));
  const noteList = JSON.parse(data);
  //Loops through array and locates a matching ID from deletedNote variable//
  for (let i = 0; i < noteList.length; i++) {
    if (deletedNote === noteList[i].id) {
      //Removes object with matching ID, i is used to match the index of the object to be removed//
      noteList.splice(i, 1);
    }
  }
  //Converts updated array back into strigified format//
  const updatedNotes = JSON.stringify(noteList);
  //JSON file is rewritten with updated array of objects//
  fs.writeFile(path.join(__dirname, "db/db.json"), updatedNotes, (err) => {
    if (err) throw err;
    res.end("post successful");
  });
});

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`));
