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
      directoryInfo.isRoot = chunk.parentId ? false : true;
      directoryInfo.parentId = chunk.parentId;
      directoryInfo.userId = chunk.userId;
      fileBuffer.push(chunk.content);
    });

    // On receive end, validate and save
    call.on("end", async () => {
      try {
        console.log(directoryInfo);
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
        content: fileBuffer,
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

const getFile = async (call, send) => {
  const result = await fileModel.findOne({ directoryId: call.request.id });
  if (!result) {
    return;
  }
  const fileBuffer = result.content;
  // send files as streams
  fileBuffer.forEach((chunk) => {
    call.write({ content: chunk });
  });
  call.end();
};

const getAll = async (call, send) => {
  try {
    let directories = [];
    if (call.request.parentId) {
      directories = await directoryModel.find({
        parentId: call.request.parentId,
      });
    } else {
      directories = await directoryModel.find({ isRoot: true });
    }
    send(null, { directories });
  } catch (error) {
    send(error);
  }
};

const update = async (call, send) => {
  try {
    const updateInfo = call.request;
    let newSequence;
    if (updateInfo.prevSequence && updateInfo.nextSequence) {
      newSequence = (updateInfo.prevSequence + updateInfo.newSequence) / 2;
    }
    const updatedInfo = await directoryModel.findByIdAndUpdate(
      updateInfo.id,
      {
        $set: {
          name: updateInfo.name,
          sequence: newSequence ? Math.abs(newSequence) : undefined,
        },
      },
      { new: true }
    );
    send(null, updatedInfo);
  } catch (error) {
    send(error);
  }
};

const deleteById = async (call, send) => {
  try {
    const deleteRequest = call.request;
    const parallelAPis = [];
    parallelAPis.push(directoryModel.findByIdAndDelete(deleteRequest.id));
    if (deleteRequest.type === "file") {
      parallelAPis.push(
        fileModel.findOneAndDelete({ directoryId: deleteRequest.id })
      );
    } else {
      parallelAPis.push(
        directoryModel.findOneAndDelete({ parentId: deleteRequest.id })
      );
    }
    await Promise.all(parallelAPis);
    send(null, { message: "success" });
  } catch (error) {
    send(error);
  }
};

export default {
  create,
  getFile,
  getAll,
  update,
  deleteById,
};
