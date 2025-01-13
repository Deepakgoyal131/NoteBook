const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const router = express.Router();
 
//ROUTE 1: Get All the Notes Using: GET "localhost:5000/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        res.status(500).send("Internal server Error");
    }
})

//ROUTE 2: Add a new note using: POST "localhost:5000/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', "Description must be atleast 5 character").isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;//destructuring
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();

        // const notes = await Notes.find({user: req.user.id})
        res.json(savedNote);

    } catch (error) { 
        res.status(500).send("Internal server Error");
    }
});

//ROUTE 3:Update an existing Note using: put "localhost:5000/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //Create a new Note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });


    } catch (error) {
        res.status(500).send("Internal server Error");
    }


});

//ROUTE 4:Delete an existing Note using: DELETE "localhost:5000/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //Find note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Sucsses": "Note has been Delete", note: note });
        
    } catch (error) {
        res.status(500).send("Internal server Error");
    }
    

});
module.exports = router;