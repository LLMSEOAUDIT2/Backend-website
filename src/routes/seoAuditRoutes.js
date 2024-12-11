const express = require('express');
const router = express.Router();
const SeoAuditController = require('../controller/SeoAuditController');



// POST route untuk menambahkan data baru
router.post('/post', SeoAuditController.add);

// GET route untuk mendapatkan semua data
router.get('/get', SeoAuditController.getAll);

// GET route untuk mendapatkan data berdasarkan ID
router.get('/get/:id', SeoAuditController.getById);

// DELETE route untuk menghapus semua data
router.delete('/delete', SeoAuditController.clear);

// DELETE route untuk menghapus data berdasarkan ID
router.delete('/delete/:id', SeoAuditController.deleteById);

// PUT route untuk memperbarui data berdasarkan ID
router.put('/update/:id', SeoAuditController.editById);

router.get('/download-pdf', SeoAuditController.downloadPdf);

module.exports = router;
