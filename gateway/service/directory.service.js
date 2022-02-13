import client from "../client/directory.client.js";
import { splitBufferIntoChunks } from "./utils.js";

const create = (directoryInfo) => {
  const chunks = splitBufferIntoChunks(directoryInfo.content);
  return new Promise((resolve, reject) => {
    const call = client.create((error, directory) => {
      if (error) {
        return reject(error);
      }
      resolve(directory);
    });
    if (directoryInfo.type === "folder") {
      call.write({ ...directoryInfo });
    } else {
      chunks.forEach((chunk) => {
        call.write({ ...directoryInfo, content: chunk });
      });
    }

    call.end();
  });
};

const getAll = (parentId) => {
  try {
    return new Promise((resolve, reject) => {
      client.getAll({ parentId }, (error, directories) => {
        if (error) {
          return reject(error);
        }
        resolve(directories);
      });
    });
  } catch (error) {
    throw error;
  }
};

const getFile = (id) => {
  return new Promise((resolve, reject) => {
    const call = client.getFile({ id });
    const fileBuffer = [];
    // Receive file streams
    call.on("data", (chunk) => {
      fileBuffer.push(chunk.content);
    });
    call.on("end", () => resolve(fileBuffer));
  });
};

const update = (updateInfo) => {
  try {
    return new Promise((resolve, reject) => {
      client.update(updateInfo, (error, user) => {
        if (error) {
          return reject(error);
        }
        resolve(user);
      });
    });
  } catch (error) {
    throw error;
  }
};

const deleteById = (type, id) => {
  try {
    return new Promise((resolve, reject) => {
      client.deleteById({ id, type }, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  getAll,
  getFile,
  update,
  deleteById,
};
