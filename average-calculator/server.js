const express = require("express");
const app = express();
const numbersRoute = require("./routes/numbers");

app.use("/numbers", numbersRoute);

const PORT = 9876;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
