const express = require('express');
const router = express.Router();
const seoAuditController = require('../controller/openAiController');

// Route untuk menerima data SEO audit
router.post('/send-seo-data', seoAuditController.handleSeoAudit);

module.exports = router;
