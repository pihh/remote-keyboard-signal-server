const admin = require("firebase-admin");
const { fcm } = require("./firebase");
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

const sendOffer = (token,offer = { type: "offer", sdp: "mock-sdp" }) => {
  send(token, { offer: JSON.stringify(offer) }, "Offer from Android!");
};

const sendAnswer = (token,answer = { type: "answer", sdp: "mock-sdp" }) => {
  send(token, { answer: JSON.stringify(answer) }, "Answer from Android!");
};

// Export functions
module.exports = { sendAnswer, sendOffer };
