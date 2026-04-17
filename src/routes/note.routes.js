const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes } = require("../controllers/note.controller");

router.get("/", getAllNotes);
router.post("/bulk", createBulkNotes);
router.post("/", createNote);

module.exports = router;
