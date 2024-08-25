require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const authRoutes = require("./routes/auth/auth");
const groupRoutes = require("./routes/group/group");
const messageRoutes = require("./routes/message/message");
const db = require("./config/database/db");
const http = require("http");
const { initSocket } = require("./socket/socketIO");
const app = express();
const server = http.createServer(app);
initSocket(server);
app.use(express.json());
db();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupRoutes);

server.listen(process.env.PORT, () => {
  console.log("Server is running on port" , process.env.PORT);
  console.log("Api documentation click the link http://localhost:8080/api-docs/#/");
});
