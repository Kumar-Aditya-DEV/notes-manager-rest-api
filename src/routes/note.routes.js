const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes, getNoteById } = require("../controllers/note.controller");

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/bulk", createBulkNotes);
router.post("/", createNote);

module.exports = router;
