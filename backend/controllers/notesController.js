const Note = require("../models/noteModel");

module.exports.addNote = async (req, res) => {
  try {
    const { title, notes, tags } = req.body;
    console.log(req.body);
    const { userId } = req.user;
    await Note.create({
      title,
      notes,
      tags,
      userId,
      date: new Date(),
      archived: false,
    });
    res.status(201).json({ msg: "Note created successfully" });
  } catch (error) {
    conosle.log(error.message);
    return res.json({ msg: error.message });
  }
};

module.exports.getNotes = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const notes = await Note.find({ userId });
    res.status(200).json({ notes });
  } catch (error) {
    console.log(error.message);
    return res.json({ msg: error.message });
  }
};

module.exports.deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    await Note.deleteOne({ _id: noteId });
    res.status(200).json({ msg: "Note Deleted" });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

module.exports.archiveNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    await Note.findByIdAndUpdate(noteId, {
      $set: { archived: true },
    });
    res.status(200).json({ msg: "Note archived" });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

module.exports.unarchiveNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    await Note.findByIdAndUpdate(noteId, {
      $set: { archived: false },
    });
    res.status(200).json({ msg: "Note archived" });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

module.exports.archivedNotes = async (req, res) => {
  try {
    const { userId } = req.params;
    const archivedNotes = await Note.find({ userId, archived: true });
    res.status(200).json({ archivedNotes });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};
