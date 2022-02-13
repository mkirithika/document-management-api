import { fileModel, directoryModel } from "./directory.modal.js";

const create = (call, send) => {
  try {
    let fileBuffer = [];
    const directoryInfo = {};

    // Receive file buffer as streams
    call.on("data", (chunk) => {
      directoryInfo.name = chunk.name;
      directoryInfo.size = chunk.size;
      directoryInfo.mimeType = chunk.mimeType;
      directoryInfo.type = chunk.type;
      directoryInfo.isRoot = !!chunk.parentId;
      directoryInfo.parentId = chunk.parentId;
      directoryInfo.userId = chunk.userId;
      fileBuffer.push(chunk.content);
    });

    // On receive end, validate and save
    call.on("end", async () => {
      try {
        const directory = await save(directoryInfo, fileBuffer);
        send(null, directory);
      } catch (error) {
        send(error);
      }
    });
  } catch (error) {
    send(error);
  }
};

const save = async (directoryInfo, fileBuffer) => {
  try {
    // Validate parentId and get last sequence number
    const directories = await Promise.all([
      getById(directoryInfo.parentId),
      getLastSequence(),
    ]);

    if (directoryInfo.parentId && !directories?.[0]) {
      throw { statusCode: 404, message: "Invalid parent id" };
    }
    directoryInfo.sequence = directories?.[1]?.[0]?.sequence
      ? directories?.[1]?.[0]?.sequence + 1
      : 1000;
    // save directoryInfo in database
    const insertedDirectory = await directoryModel.create(directoryInfo);
    if (fileBuffer?.length) {
      await fileModel.create({
        directoryId: insertedDirectory._id,
        userId: insertedDirectory.userId,
        content: JSON.stringify(fileBuffer),
      });
    }

    return insertedDirectory;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    if (!id) {
      return;
    }
    const directory = await directoryModel.findById(id, { id });

    return directory;
  } catch (error) {
    throw error;
  }
};

const getLastSequence = async () => {
  try {
    const directory = await directoryModel
      .find()
      .sort({ sequence: -1 })
      .limit(1);

    return directory;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
};
