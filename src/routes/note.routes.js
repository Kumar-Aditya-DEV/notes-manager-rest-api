const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes, getNoteById, replaceNote, updateNote, deleteNote } = require("../controllers/note.controller");

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", replaceNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/bulk", createBulkNotes);
router.post("/", createNote);

module.exports = router;
