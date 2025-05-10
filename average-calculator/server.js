const axios = require("axios");
const express = require("express");
const app = express();
const PORT = 9876;

let numberWindow = [];
const windowSize = 10;

const apiUrlMap = {
  p: "primes",
  f: "fibo",
  e: "even",
  r: "rand",
};

// Fetch token using authentication details
async function getAuthToken() {
  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      {
        email: "ramkrishna@abc.edu",
        name: "ram krishna",
        rollNo: "aa1bb",
        accessCode: "xgAsNC",
        clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
        clientSecret: "tVJaaaRBSeXcRXeM",
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching auth token:", error);
    throw new Error("Authentication failed");
  }
}

function avg(arr) {
  if (arr.length === 0) return 0;
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
}

app.get("/numbers/:id", async (req, res) => {
  const id = req.params.id;
  const endpoint = apiUrlMap[id];

  if (!endpoint) return res.status(400).json({ error: "Invalid ID" });

  const prevState = [...numberWindow];
  let numbers = [];

  try {
    const BEARER_TOKEN = await getAuthToken();

    const response = await axios.get(
      `http://20.244.56.144/evaluation-service/${endpoint}`,
      {
        timeout: 500,
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    numbers = response.data.numbers || [];
  } catch (e) {
    console.error("Error fetching numbers:", e);
    return res.json({
      windowPrevState: prevState,
      windowCurrState: numberWindow,
      numbers: [],
      avg: parseFloat(avg(numberWindow)),
    });
  }

  for (let num of numbers) {
    if (!numberWindow.includes(num)) {
      numberWindow.push(num);
      if (numberWindow.length > windowSize) numberWindow.shift();
    }
  }

  return res.json({
    windowPrevState: prevState,
    windowCurrState: numberWindow,
    numbers,
    avg: parseFloat(avg(numberWindow)),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
