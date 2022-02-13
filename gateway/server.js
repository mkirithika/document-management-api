import express from "express";
import multer from "multer";
import cors from "cors";
import jsonwebtoken from "jsonwebtoken";

import userController from "./controller/user.controller.js";
import directoryController from "./controller/directory.controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(express.json());

app.use(cors());
app.options("*", cors());

const validateToken = async (request, response, next) => {
  try {
    if (!request?.headers?.authorization) {
      return response.status(401).send("Unauthorised");
    }
    const userInfo = await jsonwebtoken.verify(
      request.headers.authorization,
      "secretKey"
    );
    if (!userInfo?.data?.id) {
      return response.status(401).send("Unauthorised");
    }
    request.authInfo = userInfo.data;
    next();
  } catch (error) {
    return response.status(401).send("Unauthorised");
  }
};

app.get("/ping", (request, response) => {
  response.send("Pong");
});
app.post("/signup", userController.signUp);
app.post("/login", userController.login);
app.post(
  "/directories",
  validateToken,
  upload.single("file"),
  directoryController.create
);
app.get("/directories", validateToken, directoryController.getAll);
app.get("/directories/files/:id", validateToken, directoryController.getFile);
app.put("/directories/:id", validateToken, directoryController.update);
app.delete("/directories/:id", validateToken, directoryController.deleteById);

app.listen(4000);
console.log("Gateway service started");
