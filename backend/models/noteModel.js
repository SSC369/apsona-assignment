const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  archived: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
