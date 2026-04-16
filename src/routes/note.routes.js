const express = require("express");
const router = express.Router();
const {
  createNote,
  createBulkNotes,
  getAllNotes,
} = require("../controllers/note.controller");

// POST routes
router.post("/bulk", createBulkNotes);
router.post("/", createNote);

// GET routes
router.get("/", getAllNotes);

module.exports = router;
