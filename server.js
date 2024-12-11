require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const seoAuditRoutes = require('./src/routes/seoAuditRoutes');
const openAi = require('./src/routes/openAi');


const app = express();
const port = process.env.PORT || 3000;

//cors
app.use(cors());

// Middleware
app.use(express.json());

// Route untuk menampilkan "server berjalan"
app.get('/', (req, res) => {
    res.send('Server berjalan');
});

// Route untuk Auth
app.use('/auth', authRoutes);

// Route untuk seo audit
app.use('/seoAudit', seoAuditRoutes);

// route untuk open ai 
app.use('/api', openAi);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
