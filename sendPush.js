const admin = require("firebase-admin");
const { fcm } = require("./firebase");

const pcToken =
  "cLd_83cR7nWygwVMfgxFdM:APA91bHIN4Wt1cKphuWvQ3wsotJ8TBfm22XIaN-A7ap5HWRqhvT2MLvE4xqL73b_1ug1Rb0sXMCp-op7Eu1dh-eP5oUr52kP4z94IMQjKzADVyPH7CULKR0";
const send = (token, payload, message) => {
  const messageObj = {
    token: token,
    data: {
      message: message,
      ...payload,
    },
    notification: {
      title: "Incoming WebRTC Offer",
      body: "Your Android device wants to connect!",
    },
  };

  // Log the message object to verify the contents
  console.log("Message Object:", messageObj);

  fcm
    .send(messageObj)
    .then((response) => {
      console.log("✅ Successfully sent message:", response);
    })
    .catch((error) => {
      console.error("❌ Error sending message:", error);
    });
};

const sendOffer = (offer = { type: "offer", sdp: "mock-sdp" }) => {
  send(pcToken, { offer: JSON.stringify(offer) }, "Offer from Android!");
};

const sendAnswer = (answer = { type: "answer", sdp: "mock-sdp" }) => {
  send(pcToken, { answer: JSON.stringify(answer) }, "Answer from Android!");
};

// Export functions
module.exports = { sendAnswer, sendOffer };
/* 
const sendAnswer = (answer = { type: "answer", sdp: "mock-sdp" }) => {
  send(pcToken, { answer: JSON.stringify(answer) }, "Offer from Android!");
};

module.exports = { sendAnswer, sendOffer };
 */
