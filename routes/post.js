const express = require("express");
const router = express.Router();
const { createPost, editPost, deletePost } = require("../controllers/post");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router.post("/create-post", authentication, authorization, createPost);
router.patch("/edit-post/:post_id", authentication, authorization, editPost);
router.delete(
  "/delete-post/:post_id",
  authentication,
  authorization,
  deletePost
);

module.exports = router;
