const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {
  createComment,
  editComment,
  deleteComment,
} = require("../controllers/comment");

/**
 * comments to a user's post
 * @swagger
 * /comments/add-comment/{post_id}:
 *   post:
 *     summary: To add a comment to a post.
 *     description: this end point for user add a comment to a post.
 *     tags:
 *       - COMMENTS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: headers
 *         required: true
 *       - name: post_id
 *         in: path
 *         required: true
 *       - name: comment
 *         in: body
 *         required: true
 *     responses:
 *        200:
 *          description: comment successfully created.
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.post(
  "/add-comment/:post_id",
  authentication,
  authorization,
  createComment
);

/**
 * edit comment to a user's post
 * @swagger
 * /comments/edit-comment/{comment_id} :
 *   patch:
 *     summary: To edit a comment to a post.
 *     description: this end point for user to edit their comment.
 *     tags:
 *       - COMMENTS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: headers
 *         required: true
 *       - name: commment_id
 *         in: path
 *         required: true
 *       - name: comment
 *         in: body
 *         required: true
 *     responses:
 *        200:
 *          description: comment editted successfully.
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.patch(
  "/edit-comment/:comment_id",
  authentication,
  authorization,
  editComment
);

/**
 * delete a user's comment to a post
 * @swagger
 * /comments/delete-comment/{comment_id} :
 *   delete:
 *     summary: To delete a comment to a post.
 *     description: this end point for user to delete their comment.
 *     tags:
 *       - COMMENTS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: headers
 *         required: true
 *       - name: commment_id
 *         in: path
 *         required: true
 *     responses:
 *        200:
 *          description: comment deleted successfully.
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
  "/delete-comment/:comment_id",
  authentication,
  authorization,
  deleteComment
);
module.exports = router;
