const { v4: uuidv4 } = require('uuid');
const { db, admin } = require('../config/firebaseConfig');

const seoAuditData = [];

const SeoAuditModel = {
    // Mendapatkan semua data audit
    getAll: () => seoAuditData,

    // Mendapatkan data audit berdasarkan ID
    getById: (id) => seoAuditData.find((audit) => audit.id === id),

    add: async (data) => {
        const newAudit = { id: uuidv4(), ...data };

        // Jika ingin menyimpan ke Firestore:
        try {
            const auditRef = db.collection('audits').doc(); // atau Anda bisa menggunakan .add() jika ingin Firestore yang membuat ID
            await auditRef.set(newAudit);
            return { ...newAudit, id: auditRef.id }; // ID dari Firestore
        } catch (error) {
            console.error('Error saving to Firestore:', error);
            throw new Error('Failed to save audit to Firestore');
        }
    },

    // Menghapus data audit berdasarkan ID
    deleteById: async (id) => {
        if (!id || typeof id !== 'string') {
            throw new Error('ID dokumen tidak valid');
        }
    
        try {
            const docRef = db.collection('audits').doc(id);
            const docSnapshot = await docRef.get();
    
            if (!docSnapshot.exists) {
                console.error('Document not found');
                return false; // Document not found
            }
    
            await docRef.delete();
            console.log(`Document with ID ${id} successfully deleted.`);
            return true; // Successfully deleted
        } catch (error) {
            console.error('Error deleting document:', error);
            throw new Error('Terjadi kesalahan saat menghapus data');
        }
    },
    

    // Menghapus semua data audit
    clear: () => seoAuditData.splice(0, seoAuditData.length),

    // Mengupdate data audit berdasarkan ID
    updateById: async (id, updatedData) => {
        if (!id || typeof id !== 'string') {
            throw new Error('ID dokumen tidak valid');
        }
    
        try {
            const docRef = db.collection('audits').doc(id);
            const docSnapshot = await docRef.get();
    
            if (!docSnapshot.exists) {
                console.error('Document not found');
                return null; // Document not found
            }
    
            // Memperbarui data
            await docRef.update(updatedData);
            console.log(`Document with ID ${id} successfully updated.`);
            
            // Mengembalikan data yang sudah diperbarui
            const updatedDoc = await docRef.get();
            return updatedDoc.data(); // Returning the updated document data
        } catch (error) {
            console.error('Error updating document:', error);
            throw new Error('Terjadi kesalahan saat memperbarui data');
        }
    }
    
};

module.exports = SeoAuditModel;
