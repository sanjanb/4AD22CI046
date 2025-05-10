const express = require("express");
const app = express();
const numbersRoute = require("./routes/numbers");

app.use("/numbers", numbersRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = 9876;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
