const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
});

const db = admin.firestore();

// === /offer ===
// Android device sends offer here
app.post('/offer', async (req, res) => {
  const { offer } = req.body;
  if (!offer) return res.status(400).send('Missing offer');

  try {
    await db.collection('signals').doc('latest-offer').set({
      offer,
      timestamp: Date.now(),
    });
    console.log('Offer stored');
    res.sendStatus(200);
  } catch (err) {
    console.error('Error saving offer:', err);
    res.status(500).send('Failed to save offer');
  }
});

// === /accept ===
// PC sends answer here
app.post('/accept', async (req, res) => {
  const { answer } = req.body;
  if (!answer) return res.status(400).send('Missing answer');

  try {
    await db.collection('signals').doc('latest-answer').set({
      answer,
      timestamp: Date.now(),
    });
    console.log('Answer stored');
    res.sendStatus(200);
  } catch (err) {
    console.error('Error saving answer:', err);
    res.status(500).send('Failed to save answer');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Signaling server running on http://localhost:${PORT}`);
});
