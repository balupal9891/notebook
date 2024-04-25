const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');


// Route 1: Get All notes using : GET "/api/notes/createuser/" Login required
router.get('/fetchallnotes',fetchuser, async (req, res)=>{

    try {
        const notes = await Notes.find({user:req.user.id})
        res.json(notes); 
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route 2: Add a notes using : GET "/api/notes/addnote/" Login required
router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 4 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res)=>{

    try {
        // If there are errors then return bad requests 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
    
        const {title, description, tag} = req.body;
        const note = new Notes({
            title,description,tag, user: req.user.id
        })
        const savedNote = await note.save();
        // console.log(savedNote)
        res.json(savedNote);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }

})

// Route 3: Update a existing notes using : GET "/api/notes/updatenote/" Login required
router.put('/updatenote/:id',fetchuser, async (req, res)=>{
        // Making a new object and filling information which has to be updated in the given note 
        const {title, description, tag} = req.body;

        try {
            const newNote = {};
            if(title){newNote.title= title}
            if(description){newNote.description= description}
            if(tag){newNote.tag= tag}
    
            // Find the note to be updated 
            // console.log(req.params.id);
            let note = await Notes.findById(req.params.id);
            if(!note){
                res.status(404).send("Not Fonnd");
            }
            // Checking user Updating to notes are same or not 
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not allowed");
            }
            note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
            res.json({note})
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error")
        }
})


// Route 4: Delete notes using : GET "/api/notes/deletenote/" Login required
router.delete('/deletenote/:id',fetchuser, async (req, res)=>{
        
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send("Not Fonnd");
        }
        // Checking user Deleting to notes are same or not 
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note had been deleted",note: note })  
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})


module.exports = router;