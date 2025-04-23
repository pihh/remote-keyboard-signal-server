const admin = require("firebase-admin");
const { fcm } = require("./firebase");

// ⚠️ Replace this with your actual PC browser token
/* const pcToken =
  "BDRF2OTkigcpk6LBunDhV7yCeaZv50G_Cey3t5UUJvkVv0nFw_WTjJsRptcD3MRn3VEjJjaxiE_96n1YFHp5mXg"; */
const pcToken =
  "eGS1UQKAap-4mtpapr1f36:APA91bH-LKwzpMiY0xn86HxsoFqK59VR7h45h1ZTiW6DXAtpV2lI737WN2WKRexrM42iXzZPvobCdrimCJ5WX-3OoaUbVBfE8XYWJwOONDEQGWHSxogWnm0";
const message = {
  token: pcToken,
  data: {
    message: "Hello from Android!",
    offer: JSON.stringify({ type: "offer", sdp: "mock-sdp" }), // Or real SDP later
  },
  notification: {
    title: "Incoming WebRTC Offer",
    body: "Your Android device wants to connect!",
  },
};

fcm
  .send(message)
  .then((response) => {
    console.log("✅ Successfully sent message:", response);
  })
  .catch((error) => {
    console.error("❌ Error sending message:", error);
  });

const send = (token, payload, message) => {
  const message = {
    token,
    data: {
      message: message,
      ...payload, // Or real SDP later payload
    },
    notification: {
      title: "Incoming WebRTC Offer",
      body: "Your Android device wants to connect!",
    },
  };

  fcm
    .send(message)
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
  send(pcToken, { answer: JSON.stringify(answer) }, "Offer from Android!");
};

module.exports = { sendAnswer, sendOffer };
