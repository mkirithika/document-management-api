import joi from "joi";

const createFileRequest = joi.object({
  userId: joi.string().required(),
  name: joi.string().required(),
  size: joi.number().required(),
  mimeType: joi.string().required(),
  type: joi.string().required(),
  parentId: joi.string(),
  content: joi.object().required(),
});

const createFolderRequest = joi.object({
  userId: joi.string().required(),
  name: joi.string().required(),
  type: joi.string().required(),
});

const updateRequest = joi.object({
  id: joi.string().required(),
  name: joi.string(),
  prevSequence: joi.number(),
  nextSequence: joi.number(),
});

export default {
  createFileRequest,
  createFolderRequest,
  updateRequest,
};
