import { loadPackageDefinition, credentials } from "grpc";
import { loadSync } from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageDef = loadSync(__dirname + "/../../proto/user.proto", {});

const UserService = loadPackageDefinition(packageDef).userPackage.User;
const client = new UserService("localhost:5000", credentials.createInsecure());

export default client;
