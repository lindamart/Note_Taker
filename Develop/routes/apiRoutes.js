const path = require("path");
const router = require("express").Router();
const fs = require("fs")
const db = require("../db/db.json")
const { v4: uuidv4 } = require('uuid');

router.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "../db/db.json"))

})

router.post("/notes", (req, res)=>{
    console.log("HIT OUR BACKEND POST ROUTE", req.body)

    // get the req.body and destructure it
    const { title, text } = req.body;

    // make a newNote object and add our random id
    const newNote = {
        title,
        text,
        id: uuidv4(),
    }

    console.log("NEW NOTE", newNote)
    // read the db.json file pull the "data" or notes as we know it and parse them so we can work with them in JS
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", function(err, data){
        const parsedNotes = JSON.parse(data)
        // push our newNote object into the parsedNotes from DB file
        parsedNotes.push(newNote)

// write the newly updated db back to the file 
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parsedNotes), function(err){
            if(err) throw err;
            console.log("SAVED NOTE TO DB")
        })
    
    })

    // essentially calling your get method again sending the newly updated version of the DB file to the front end
    res.sendFile(path.join(__dirname, "../db/db.json"))

})

// :id is going to take whatever notes id they chose to delete from front end
router.delete("/notes/:id", (req, res)=>{
    console.log("REQ.Param.ID", req.params.id)
    // this is going to be the note from the front end they clicked that we want to delete
    let NotetoDeleteID = req.params.id;

    
    // again getting the file and reading it parsing the notes so we can work with them
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", function(err, data){
        const parsedNotes = JSON.parse(data);
        console.log("PARSED NOTES FROM DB", parsedNotes)

        // doing a for loop of all the notes in the DB and testing if the noteTODeleteID from front end matches the parsedNotes id from DB...if it does we use the splice method to delete it fro mthe DB array.
        for(let i = 0; i < parsedNotes.length; i++){
            parsedNotesID = parsedNotes[i].id;

            if(NotetoDeleteID === parsedNotesID){
                parsedNotes.splice(i, 1)
            }
        }
        // write the newly updated DB file back to db.json
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parsedNotes), function(err){
            if(err) throw err;
        })

        // get the newly updated DB to front end
        res.sendFile(path.join(__dirname, "../db/db.json"))
    })
    


})


module.exports = router;