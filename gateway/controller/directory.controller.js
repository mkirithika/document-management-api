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
        userId: request.authInfo.id,
      });
    } else {
      validRequest = await validate(schema.createFolderRequest, {
        name: request.body.name,
        userId: request.authInfo.id,
        type: request.body.type,
      });
    }
    const directory = await service.create(validRequest);
    response.send(directory);
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

const getAll = async (request, response) => {
  try {
    const directories = await service.getAll(request.query?.parentId);
    response.send(directories);
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

const getFile = async (request, response) => {
  try {
    const fileContent = await service.getFile(request.params.id);
    fileContent.forEach((content) => {
      response.write(content);
    });
    response.status(200).send();
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

const update = async (request, response) => {
  try {
    const validRequest = await validate(schema.updateRequest, {
      ...request.body,
      id: request.params.id,
    });
    const directory = await service.update(validRequest);
    response.send(directory);
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

const deleteById = async (request, response) => {
  try {
    await service.deleteById(request.query?.type, request.params.id);
    response.send({ success: true });
  } catch (error) {
    response.status(error.statusCode || 500).send(error);
  }
};

export default {
  create,
  getAll,
  getFile,
  update,
  deleteById,
};
