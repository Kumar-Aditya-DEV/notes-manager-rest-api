const express = require("express");
const router = express.Router();
const {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
} = require("../controllers/note.controller");

// POST routes
router.post("/bulk", createBulkNotes);
router.post("/", createNote);

// GET routes
router.get("/", getAllNotes);
router.get("/:id", getNoteById);

module.exports = router;
