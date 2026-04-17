const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes, getNoteById, replaceNote, updateNote } = require("../controllers/note.controller");

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", replaceNote);
router.patch("/:id", updateNote);
router.post("/bulk", createBulkNotes);
router.post("/", createNote);

module.exports = router;
