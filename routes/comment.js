const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {
  createComment,
  editComment,
  deleteComment,
} = require("../controllers/comment");

router.post(
  "/add-comment/:post_id",
  authentication,
  authorization,
  createComment
);
router.patch(
  "/edit-comment/:comment_id",
  authentication,
  authorization,
  editComment
);
router.delete(
  "/delete-comment/:comment_id",
  authentication,
  authorization,
  deleteComment
);
module.exports = router;
