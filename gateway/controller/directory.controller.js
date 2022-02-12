import schema from "../schema/directory.schema.js";
import service from "../service/directory.service.js";
import { validate } from "./validate.js";

const create = async (request, response) => {
  try {
    let validRequest;
    if (request.body.type === "file") {
      validRequest = await validate(schema.createFileRequest, {
        name: request.file.originalname,
        size: request.file.size,
        mimeType: request.file.mimetype,
        type: request.body.type,
        parentId: request.body.parentId,
        content: request.file.buffer,
      });
    } else {
      validRequest = await validate(schema.createFolderRequest, {
        name: request.file.originalname,
      });
    }
    const user = await service.create(validRequest);
    response.send(validate(schema.directoryResponse, user));
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

const getDirectories = async (request, response) => {
  try {
    const directories = await service.getDirectories(request.query?.parentId);
    response.send(validate(schema.getDirectoriesResponse, directories));
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

const getFile = async (request, response) => {
  try {
    const fileContent = await service.getFile(request.params.id);
    response.send(validate(schema.getFileResponse, fileContent));
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

const updateDirectory = async (request, response) => {
  try {
    const validRequest = await validate(schema.updateRequest, {
      ...request.body,
      id: request.params.id,
    });
    const directory = await service.updateDirectory(validRequest);
    response.send(validate(schema.directoryResponse, directory));
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

const deleteDirectory = async (request, response) => {
  try {
    await service.deleteDirectory(request.query?.type, request.params.id);
    response.send({ success: true });
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

export default {
  create,
  getDirectories,
  getFile,
  updateDirectory,
  deleteDirectory,
};
