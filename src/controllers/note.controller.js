const mongoose = require("mongoose");
const Note = require("../models/note.model");

// Helper: Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// 1. POST /api/notes — Create a single note
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = await Note.create({ title, content, category, isPinned });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

// 2. POST /api/notes/bulk — Create multiple notes
const createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notes array is required and cannot be empty",
        data: null,
      });
    }

    const createdNotes = await Note.insertMany(notes, {
      runValidators: true,
    });

    return res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

// 3. GET /api/notes — Get all notes
const getAllNotes = async (req, res) => {
  try {
    const { category, isPinned, search, sortBy, order, page = 1, limit = 10 } = req.query;

    const query = {};

    if (category) query.category = category;
    if (isPinned !== undefined) query.isPinned = isPinned === "true";
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const sortField = sortBy || "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;
    const sort = { [sortField]: sortOrder };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const pageSize = parseInt(limit);

    const notes = await Note.find(query).sort(sort).skip(skip).limit(pageSize);
    const totalNotes = await Note.countDocuments(query);

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: {
        notes,
        pagination: {
          total: totalNotes,
          page: parseInt(page),
          limit: pageSize,
          totalPages: Math.ceil(totalNotes / pageSize),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

// 4. GET /api/notes/:id — Get a single note by ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

// 5. PUT /api/notes/:id — Replace a note completely
const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required for full replacement",
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content, category, isPinned },
      { new: true, overwrite: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: note,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

module.exports = {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
};
