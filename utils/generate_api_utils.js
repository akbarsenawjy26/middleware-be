const crypto = require("crypto");

const generateApiKey = async (guid) => {
  const timestamps = Date.now().toString(36);
  const hmac = crypto.createHmac("sha256", timestamps); // Ubah nama variabel untuk HMAC
  hmac.update(guid);
  const apiKey = hmac.digest("hex"); // Hasil digest sudah berupa string
  console.log(apiKey); // Menampilkan API key yang dihasilkan
  return apiKey;
};

module.exports = { generateApiKey };
