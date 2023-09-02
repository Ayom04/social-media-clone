const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { react, unReact } = require("../controllers/reactions");

/**
 * reacts a post for a user
 * @swagger
 * /reactions/react/{post_id} :
 *   patch:
 *     summary: to react to a post
 *     description: this enables the users to react to a post
 *     tags:
 *       - REACTIONS
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: headers
 *         required: true
 *       - name: post_id
 *         in: path
 *         required: true
 *       - name: reaction
 *         in: body
 *         required: true
 *     responses:
 *        200:
 *          description: successfully reacted to this post.
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.post("/react/:post_id", authentication, authorization, react);

/**
 * deletes a user's reaction to a post
 * @swagger
 * /reactions/undo-react/{post_id} :
 *   patch:
 *     summary: to react to a post
 *     description: this enables the users to react to a post
 *     tags:
 *       - REACTIONS
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
 *          description: you no longer raect to this post.
 *        422:
 *          Bad Request
 *        404:
 *         description: The link has expired or is invalid
 *        500:
 *         description: Internal Server Error
 *        401:
 *        description: Unauthorized
 */
router.delete("/undo-react/:post_id", authentication, authorization, unReact);
module.exports = router;
