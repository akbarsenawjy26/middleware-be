const crypto = require("crypto");

const generateApiKey = async (guid) => {
  const timestamps = Date.now().toString(20);
  const hmac = crypto.createHmac("sha256", timestamps);
  hmac.update(guid);
  const apiKey = hmac.digest("hex");
  console.log(apiKey);
  return apiKey;
};

module.exports = { generateApiKey };
