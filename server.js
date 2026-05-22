import express from "express";
import excuseRouter from "./routes.js";

const PORT = 8080;

const server = express();

server.use(express.json());
server.use(excuseRouter);

// Home route, we list all routes in here
server.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Excuse Generator API",
    endpoints: {
      getAllExcuses: "GET /excuses",
      getOneExcuse: "GET /excuses/:id",
      createExcuse: "POST /excuses",
      updateExcuse: "PUT /excuses/:id",
      deleteExcuse: "DELETE /excuses/:id",
      randomExcuse: "GET /excuses/random"
    }
  });
});



server.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});