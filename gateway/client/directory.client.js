import { loadPackageDefinition, credentials } from "grpc";
import { loadSync } from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageDef = loadSync(__dirname + "/../../proto/directory.proto", {});

const DirectoryService =
  loadPackageDefinition(packageDef).directoryPackage.Directory;
const client = new DirectoryService(
  "localhost:6000",
  credentials.createInsecure()
);

export default client;
