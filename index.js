require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const displayRoutes = require("express-routemap");
const { notFoundMessage, welcomeMessage } = require("./constants/messages");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const reactionRoute = require("./routes/reaction");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: false,
    message: welcomeMessage,
  });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/reactions", reactionRoute);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  displayRoutes(app);
});

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: notFoundMessage,
  });
});
