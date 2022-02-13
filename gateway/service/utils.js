export const splitBufferIntoChunks = (bufferArr = [], length = 4000000) => {
  const chunks = [],
    n = bufferArr.length;
  let i = 0;
  while (i < n) {
    chunks.push(bufferArr.slice(i, (i += length)));
  }
  return chunks;
};
