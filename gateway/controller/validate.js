export const validate = async (schema, data) => {
  const res = await schema.validate(data);
  if (res.error) {
    throw { statusCode: 400, error: res.error };
  }
  return res.value;
};
