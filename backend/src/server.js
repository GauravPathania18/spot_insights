const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sessions", (req, res) => {
  console.log("Received session:");
  console.log(req.body);

  res.status(201).json({ status: "ok" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
