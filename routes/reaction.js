const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { react, unReact } = require("../controllers/reactions");

router.post("/react/:post_id", authentication, authorization, react);
router.delete("/undo-react/:post_id", authentication, authorization, unReact);
module.exports = router;
