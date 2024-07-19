const router = require("express").Router();

const {
  register,
  login,
  userProfile,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:userId", userProfile);
module.exports = router;
