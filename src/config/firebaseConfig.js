const admin = require('firebase-admin');
const serviceAccount = require('./capstone-llm-seo-audit-f0581611c86c.json'); // path ke file JSON yang diunduh

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Ekspor Firestore instance
const db = admin.firestore();
module.exports = { admin, db };
