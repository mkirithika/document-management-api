import mongoose from "mongoose";

const directorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number },
  mimeType: { type: String },
  type: { type: String, required: true },
  sequence: { type: Number },
  isRoot: { type: Boolean },
  parentId: { type: String },
  userId: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

const fileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  directoryId: { type: String, required: true },
  content: { type: [Buffer], required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

const directoryModel = mongoose.model("diretories", directorySchema);
const fileModel = mongoose.model("files", fileSchema);

export { fileModel, directoryModel };
