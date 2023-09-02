const express = require("express");
const router = express.Router();
const {
  createPost,
  editPost,
  deletePost,
  getPost,
  getAllPosts,
} = require("../controllers/post");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

/**
 * creates a new post for a user
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
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.post("/create-post", authentication, authorization, createPost);

/**
 * edits a user's post
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
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.patch("/edit-post/:post_id", authentication, authorization, editPost);

/**
 * deletes a user's post
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
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.delete(
  "/delete-post/:post_id",
  authentication,
  authorization,
  deletePost
);

/**
 * fetch a post
 * @swagger
 * /get-post/{post_id}:
 *   get:
 *     summary: fetch a post user's post.
 *     description: this end point for admin to fetch a post.
 *     tags:
 *       - POSTS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: apikey
 *         in: headers
 *         required: true
 *       - name: post_id
 *         in: path
 *         required: true
 *     responses:
 *        200:
 *          description: Post retrieved successfully.
 *        422:
 *          Bad Request
 *        404:
 *         description: Post not found
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.get("/get-post/:post_id", getPost);

/**
 * deletes a user's post
 * @swagger
 * /posts/get-full-postByUser:
 *   get:
 *     summary: fetch all user's post.
 *     description: this end point for user to fetch their posts includng the comments and reactions.
 *     tags:
 *       - POSTS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: headers
 *         required: true
 *     responses:
 *        200:
 *          description: Your post has been fetched succesfully
 *        422:
 *          Bad Request
 *        404:
 *         description: user haven't created any post
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.get("/get-full-postByUser", authentication, authorization, getAllPosts);
module.exports = router;
