const createDirectory = (directoryInfo) => {
  try {
    console.log(directoryInfo);
  } catch (error) {
    throw error;
  }
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
  createDirectory,
  getDirectories,
  getFile,
  updateDirectory,
  deleteDirectory,
};
