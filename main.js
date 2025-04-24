const express = require("express");
const cors = require("cors");
const { db, fcm } = require("./firebase");
const { sendOffer, sendAnswer } = require("./sendPush");

const app = express();

// Setup CORS
app.use(cors());
//app.options("*", cors()); // Handles pre-flight requests

// Middleware to parse JSON request bodies
app.use(express.json());

// === /offer ===
// Android device sends offer here
app.post("/offer", async (req, res) => {
  const { offer } = req.body;
  if (!offer) return res.status(400).send("Missing offer");

  try {
    await db.collection("signals").doc("latest-offer").set({
      offer,
      timestamp: Date.now(),
    });
    console.log("Offer stored");
    sendOffer(offer);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error saving offer:", err);
    res.status(500).send("Failed to save offer");
  }
});

// === /accept ===
// PC sends answer here
let androidToken =
  "c7iUOeHCTBdWl5x5KaQlYY:APA91bEl23JTxqZealuSZ-MQthZmyzCqcer48GQLTSdFtGvcT3izxeLfAimkKkWbOei3OQ89pI7tFV-A2F_3sOyYnwyHZ5tPNO3CKAwMV7uN3r3mKnHHp88";
/* let androidToken =
 "c4EkdAMXT1ynsgSO49zJL_:APA91bHp1ne-j2lhRBj9gQmcNqBeCW8X5BOMjQ6hHvlLABTqOSyue4meDht0JnMs4NB69dN1jrOzIO6K7br5oy69Q6zuejYHBltbC9tnD3um2dgdg5q9K-Y";
*/ // Endpoint to accept the answer from the PC
app.post("/accept", (req, res) => {
  const { answer } = req.body;
  if (!answer) {
    return res.status(400).send("Answer is required");
  }

  console.log("Answer received from PC:", answer);

  // Send the answer to the Android device via push notification
  const message = {
    token: androidToken, // Token of the Android device
    data: {
      answer: JSON.stringify(answer),
    },
    notification: {
      title: "PC Answer",
      body: "Your PC has responded with an answer!",
    },
  };

  fcm
    .send(message)
    .then((response) => {
      console.log("Successfully sent answer to Android:", response);
      res.send("Answer sent to Android!");
    })
    .catch((error) => {
      console.error("Error sending answer to Android:", error);
      res.status(500).send("Error sending answer to Android");
    });
});

// Catch-all for undefined routes (404)
/* app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
 */
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Signaling server running on http://localhost:${PORT}`);
});
