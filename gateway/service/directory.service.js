import client from "../client/directory.client.js";
import { splitBufferIntoChunks } from "./utils.js";

const create = (directoryInfo) => {
  const chunks = splitBufferIntoChunks(directoryInfo.content);
  return new Promise((resolve, reject) => {
    const call = client.createDirectory((error, directory) => {
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

const getDirectories = (parentId) => {
  try {
    console.log(parentId);
  } catch (error) {
    throw error;
  }
};

const getFile = (id) => {
  try {
    console.log(id);
  } catch (error) {
    throw error;
  }
};

const updateDirectory = (updateInfo) => {
  try {
    console.log(updateInfo);
  } catch (error) {
    throw error;
  }
};

const deleteDirectory = (type, id) => {
  try {
    console.log(type, id);
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  getDirectories,
  getFile,
  updateDirectory,
  deleteDirectory,
};
