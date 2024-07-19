const router = require("express").Router();
const validateUser = require("../middlewares/validateUser");

const {
  addNote,
  getNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  archivedNotes,
} = require("../controllers/notesController");

router.post("/add-note", validateUser, addNote);
router.get("/get-notes", validateUser, getNotes);
router.delete("/delete-note/:noteId", deleteNote);
router.put("/archive-note/:noteId", archiveNote);
router.put("/unarchive-note/:noteId", unarchiveNote);
router.get("/archived-notes/:userId", archivedNotes);
module.exports = router;
