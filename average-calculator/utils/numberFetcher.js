const axios = require("axios");
const { timeout, testServerBase, idToPath } = require("../config");

async function fetchNumbersById(id) {
  const path = idToPath[id];
  if (!path) return [];

  const url = `${testServerBase}${path}`;
  try {
    const response = await axios.get(url, { timeout });
    return response.data.numbers || [];
  } catch (err) {
    console.error(`Error fetching from ${path}:`, err.message);
    return [];
  }
}

module.exports = fetchNumbersById;
