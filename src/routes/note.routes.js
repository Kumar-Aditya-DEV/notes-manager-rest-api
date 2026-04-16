const express = require("express");
const router = express.Router();
const {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
} = require("../controllers/note.controller");

// POST routes
router.post("/bulk", createBulkNotes);
router.post("/", createNote);

// GET routes
router.get("/", getAllNotes);
router.get("/:id", getNoteById);

// PUT route
router.put("/:id", replaceNote);

module.exports = router;
