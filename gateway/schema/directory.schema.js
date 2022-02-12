import joi from "joi";

const createFileRequest = joi.object({
  name: joi.string().required(),
  size: joi.number().required(),
  mimeType: joi.string().required(),
  type: joi.string().required(),
  parentId: joi.string(),
  content: joi.object().required(),
});

const createFolderRequest = joi.object({
  name: joi.string().required(),
});

const directoryResponse = joi.object({
  id: joi.string().required(),
  name: joi.string().required(),
  size: joi.number(),
  mimeType: joi.string(),
  type: joi.string().required().valid("file", "folder"),
  sequence: joi.number().required(),
  parentId: joi.string(),
  isRoot: joi.boolean().default(false),
});

const getDirectoriesResponse = joi.object({
  directories: joi.array().items(directoryResponse),
});

const getFileResponse = joi.object({
  content: joi.object(),
});

const updateRequest = joi.object({
  id: joi.string().required(),
  name: joi.string(),
  prevSequence: joi.number(),
  nextSequence: joi.number(),
});

export default {
  createFileRequest,
  directoryResponse,
  createFolderRequest,
  getDirectoriesResponse,
  getFileResponse,
  updateRequest,
};
