const { db, admin } = require('../config/firebaseConfig');

const users = []; // Database sederhana menggunakan array

module.exports = {
    // Mencari user berdasarkan username
    findUserByUsername: async (username) => {
        const userRef = db.collection('users');
        const querySnapshot = await userRef.where('username', '==', username).get();
        
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        }
        
        return null;
    },

    // Menambahkan user baru ke Firestore
    addUser: async (user) => {
        const usersCollection = db.collection('users');
        const docRef = await usersCollection.add(user);
        return docRef.id;
    }
};
