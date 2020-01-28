const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db");

let dataPath = path.join(__dirname, '/db/db.json');
let id = 0;

// express app set up
var app = express();
var PORT = process.env.PORT || 3001;



// linking server to use the 'public' folder
app.use(express.static('public'));

// turn post requests to json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get request for html pages
app.get('/', function (req, res) {
    res.sendFile(pathjoin(__dirname, '/public/index.html'));

});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    // print('notes.html');
});

// get request for db file
app.get('/api/notes', function (req, res) {
    res.json(db);
});


app.post('/api/notes', function (req, res) {

    let newNote = req.body;
    // console.log(req.body);

    for (i = 0; i < db.length; i++) {
        let setNote = db[i];

        if (db.length === 0) {
            id = 1;
            newNote.id = id;
        }

        else if (setNote.id > id) {
            id = setNote.id;
        }
    }
    // making sure the newest note is used
    newNote.id = id + 1;

    // adds new note to the db
    db.push(newNote);


    fs.writeFileSync(dataPath, JSON.stringify(db), function (err) {
        if (err) {
            return console.log(err);
        };
        console.log("Your note has been saved.");
    });

    res.json(newNote);

});

app.delete('/api/notes/:id', function (req, res) {
    for (i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            db.splice(i, 1);
            break;
        }
    }

    fs.writeFileSync(dataPath, JSON.stringify(db), function (err) {
        if (err) {
            return console.log(err);
        }

        else {
            console.log("Your note has been deleted.");
        }
    })
    res.json(db);
})





app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));