const express = require("express");
const router = express.Router();
const { createPost, editPost, deletePost } = require("../controllers/post");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

/**
 * register a new user
 * @swagger
 * /posts/create-post:
 *   post:
 *     summary: create a post for user.
 *     description: this end point for user to create their own post.
 *     tags:
 *       - POSTS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: headers
 *         required: true
 *       - name: "post"
 *         in: body
 *         required: true
 *     responses:
 *        200:
 *          description: Post successfully created.
 *        400:
 *          Bad Request
 */
router.post("/create-post", authentication, authorization, createPost);

/**
 * register a new user
 * @swagger
 * /posts/edit-post/{post_id}:
 *   post:
 *     summary: edit a post for user.
 *     description: this end point for user to edit their own post within an hour after craetion.
 *     tags:
 *       - POSTS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: headers
 *         required: true
 *       - name: post_id
 *         in: path
 *         required: true
 *       - name: post
 *         in: body
 *         required: true
 *     responses:
 *        200:
 *          description: Post successfully editted.
 *        400:
 *          Bad Request
 */
router.patch("/edit-post/:post_id", authentication, authorization, editPost);

/**
 * register a new user
 * @swagger
 * /posts/delete-post/{post_id}:
 *   delete:
 *     summary: delete post for user.
 *     description: this end point for user to delete their post.
 *     tags:
 *       - POSTS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: headers
 *         required: true
 *       - name: post_id
 *         in: path
 *         required: true
 *     responses:
 *        200:
 *          description: Post successfully deleted.
 *        400:
 *          Bad Request
 */
router.delete(
  "/delete-post/:post_id",
  authentication,
  authorization,
  deletePost
);

module.exports = router;
