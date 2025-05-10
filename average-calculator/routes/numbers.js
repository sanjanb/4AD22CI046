const express = require("express");
const router = express.Router();
const SlidingWindow = require("../utils/slidingWindow");
const fetchNumbersById = require("../utils/numberFetcher");
const { windowSize, timeout } = require("../config");

const window = new SlidingWindow(windowSize);

router.get("/:numberid", async (req, res) => {
  const { numberid } = req.params;
  const windowPrevState = window.getData();

  try {
    const fetchPromise = fetchNumbersById(numberid);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), timeout);
    });

    const numbers = await Promise.race([fetchPromise, timeoutPromise]);

    const newlyAddedNumbers = window.addNumbers(numbers);

    res.json({
      windowPrevState,
      windowCurrState: window.getData(),
      numbers: newlyAddedNumbers,
      avg: window.getAverage(),
    });
  } catch (error) {
    console.error(`Request for ${numberid} failed:`, error.message);
    res.json({
      windowPrevState,
      windowCurrState: windowPrevState,
      numbers: [],
      avg: window.getAverage(),
    });
  }
});

module.exports = router;
