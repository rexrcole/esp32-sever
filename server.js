const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS for all origins
app.use(express.text()); // Parse plain text bodies

let latestDirection = "Waiting for directions...";

app.post("/postDirection", (req, res) => {
  latestDirection = req.body;
  console.log("Received direction:", latestDirection);
  res.send("OK");
});

app.get("/getDirection", (req, res) => {
  res.send(latestDirection);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
