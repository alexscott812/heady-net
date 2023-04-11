const { version: uuidVersion, validate: uuidValidate } = require("uuid");

const validateUUIDv4 = (uuid) => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

module.exports = validateUUIDv4;
