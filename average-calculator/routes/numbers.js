const express = require("express");
const router = express.Router();
const SlidingWindow = require("../utils/slidingWindow");
const fetchNumbersById = require("../utils/numberFetcher");
const { windowSize } = require("../config");

const window = new SlidingWindow(windowSize);

router.get("/:numberid", async (req, res) => {
  const { numberid } = req.params;
  const windowPrevState = window.getData();
  const startTime = Date.now();

  const numbers = await fetchNumbersById(numberid);

  // Discard if too slow
  if (Date.now() - startTime > 500) {
    return res.json({
      windowPrevState,
      windowCurrState: windowPrevState,
      numbers: [],
      avg: window.getAverage(),
    });
  }

  window.addNumbers(numbers);
  const windowCurrState = window.getData();

  res.json({
    windowPrevState,
    windowCurrState,
    numbers,
    avg: window.getAverage(),
  });
});

module.exports = router;
