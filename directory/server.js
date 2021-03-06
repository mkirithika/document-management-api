import { loadPackageDefinition, Server, ServerCredentials } from "grpc";
import { loadSync } from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import { dirname } from "path";

import directoryService from "./service/directory.service.js";
import { connectDB } from "./connect.js";

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageDef = loadSync(__dirname + "/../proto/directory.proto", {});
const grpcObject = loadPackageDefinition(packageDef);
const directoryPackage = grpcObject.directoryPackage;

const server = new Server();
server.bind("0.0.0.0:6000", ServerCredentials.createInsecure());

server.addService(directoryPackage.Directory.service, {
  create: directoryService.create,
  getFile: directoryService.getFile,
  getAll: directoryService.getAll,
  update: directoryService.update,
  deleteById: directoryService.deleteById,
});

server.start();
console.log("Directory server started");
