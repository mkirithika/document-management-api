import { loadPackageDefinition, Server, ServerCredentials } from "grpc";
import { loadSync } from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import { dirname } from "path";

import userService from "./service/user.service.js";
import { connectDB } from "./connect.js";

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageDef = loadSync(__dirname + "/proto/user.proto", {});
const grpcObject = loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;

const server = new Server();
server.bind("localhost:5000", ServerCredentials.createInsecure());

server.addService(userPackage.User.service, {
  signUp: userService.signUp,
  login: userService.login,
});

server.start();
console.log("User server started");
