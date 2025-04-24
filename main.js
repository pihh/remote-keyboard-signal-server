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
  if (!offer) return res.status(400).send({msg:"Missing offer"});

  try {
    await db.collection("signals").doc("latest-offer").set({
      offer,
      timestamp: Date.now(),
    });
    console.log("Offer stored");
    sendOffer(pcToken,offer);
    res.send({msg:"Offer created"})
  } catch (err) {
    console.error("Error saving offer:", err);
    res.status(500).send({msg:"Failed to save offer"});
  }
});

/**
 * Pc token logic
 * 
 */

let pcToken =
  "cLd_83cR7nWygwVMfgxFdM:APA91bFW7Gv63-_EIMd3IC2y12961fKYlj-UCV4gOYWHhhYOfSWXRKtyeFB9J_PC5oMxPcQGDnMgeB_ZNZcjis9kBIYag4uZrm-l5TISbSXu7xhWk4cIoyU";
  app.post("/pc-token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({msg:"Token is required"});
  }
  pcToken = token;
   res.send({msg:"PC token updated!"});
});

/**
 * Android token logic 
 */
let androidToken =
  "c7iUOeHCTBdWl5x5KaQlYY:APA91bEl23JTxqZealuSZ-MQthZmyzCqcer48GQLTSdFtGvcT3izxeLfAimkKkWbOei3OQ89pI7tFV-A2F_3sOyYnwyHZ5tPNO3CKAwMV7uN3r3mKnHHp88";

  app.post("/android-token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({msg:"Token is required"});
  }
  androidToken = token;
   res.send({msg:"Android token updated!"});
});


// === /accept ===
// PC sends answer here

 // Endpoint to accept the answer from the PC
app.post("/accept", (req, res) => {
  const { answer } = req.body;
  if (!answer) {
    return res.status(400).send({msg:"Answer is required"});
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
      res.send({msg:"Answer sent to Android!"});
    })
    .catch((error) => {
      console.error("Error sending answer to Android:", error);
      res.status(500).send({msg:"Error sending answer to Android"});
    });
});

/**
 * Undefined route logic
 * Catch-all for undefined routes (404)
 */

app.use((req, res) => {
  res.status(404).send({msg:"Page Not Found"});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Signaling server running on http://localhost:${PORT}`);
});
