const express = require("express");
const cors = require("cors");
const axios = require("axios"); // ⬅️ Add axios to make HTTP requests

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.text()); // Parse plain text bodies

let latestDirection = "Waiting for directions...";

// Replace with your ESP32's local IP (check Serial Monitor or use Serial.println(WiFi.localIP());)
const ESP32_IP = "http://192.168.0.197";  // ⬅️ Replace with your actual IP

app.post("/postDirection", async (req, res) => {
  latestDirection = req.body;
  console.log("Received direction:", latestDirection);

  // Step 5: Forward the direction to ESP32
  try {
    const response = await axios.post(`${ESP32_IP}/direction`, latestDirection, {
      headers: { "Content-Type": "text/plain" },
      timeout: 2000, // 2s timeout
    });
    console.log("Forwarded to ESP32:", response.status);
  } catch (error) {
    console.error("Failed to forward to ESP32:", error.message);
  }

  res.send("OK");
});

app.get("/getDirection", (req, res) => {
  res.send(latestDirection);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

