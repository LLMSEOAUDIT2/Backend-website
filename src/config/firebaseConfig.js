const admin = require('firebase-admin');
const serviceAccount = require(''); // path ke file JSON yang diunduh

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Ekspor Firestore instance
const db = admin.firestore();
module.exports = { admin, db };
