import express from "express";
import multer from "multer";
import cors from "cors";

import userController from "./controller/user.controller.js";
import directoryController from "./controller/directory.controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.post("/signup", userController.signUp);
app.post("/login", userController.login);
app.post(
  "/directories",
  upload.single("file"),
  directoryController.createDirectory
);
app.get("/directories", directoryController.getDirectories);
app.get("/directories/files/:id", directoryController.getFile);
app.put("/directories/:id", directoryController.updateDirectory);
app.delete("/directories/:id", directoryController.deleteDirectory);

app.listen(4000);
console.log("Gateway service started");
