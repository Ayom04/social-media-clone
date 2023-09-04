require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
    status: true,
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

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Social Media API",
    version: "1.0.0",
    description: "Best Text based social media  app",
    license: {
      name: "Abdullah Saba",
      //url: "abdullahayomide04@gmail.com",
    },
    // contact: {
    //   name: "Abdullah Saba",
    //   url: "https://www,github.com/Ayom04",
    // },
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api/v1/`,
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [`./routes/*.js`],
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: notFoundMessage,
  });
});
