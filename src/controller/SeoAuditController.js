const SeoAuditModel = require('../models/seoAuditModel');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { db, admin } = require('../config/firebaseConfig');

const SeoAuditController = {
    // Mendapatkan semua data audit
    getAll: async (req, res) => {
        try {
            // Mengambil data dari koleksi 'audits'
            const auditsSnapshot = await db.collection('audits').get();

            if (auditsSnapshot.empty) {
                return res.status(404).json({ message: 'no seo data' });
            }

            // Mengambil data dari setiap dokumen di koleksi dan menambahkannya ke array
            const audits = auditsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()  // Ambil data dokumen
            }));

            // Mengirimkan respons dengan data audits
            res.status(200).json(audits);
        } catch (error) {
            console.error('Error fetching audits:', error);
            res.status(500).json({ message: 'An error occurred while retrieving the data', error });
        }
    },

    // Mendapatkan data audit berdasarkan ID
    getById: async (req, res) => {
        const { id } = req.params;

        // Validasi ID
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'ID document not valid' });
        }

        try {
            const auditDoc = await db.collection('audits').doc(id).get();
            if (!auditDoc.exists) {
                return res.status(404).json({ message: 'SEO data not found' });
            }

            res.status(200).json({
                id: auditDoc.id,
                ...auditDoc.data(),
            });
        } catch (error) {
            console.error('An error occurred while retrieving the data', error);
            res.status(500).json({ message: 'An error occurred while retrieving the data', error });
        }
    },


    // Menambahkan data audit baru
    add: async (req, res) => {
        try {
            const {
                clientName,
                websiteUrl,
                auditDate,
                gtmetrixGrade,
                gtmetrixPerformance,
                gtmetrixStructure,
                pagespeedPerformance,
                pagespeedAccessibility,
                pagespeedbestpractices,
                pageSpeedSEO,
                brokenLinksCount,
                brokenLinkurl,
                duplicateContentPercentage,
                commonContentPercentage,
                uniqueContentPercentage,
                mobileFriendly,
                metaTitle,
                metaTitleCount,
                metaDescription,
                metaDescriptionCount,
                H1Count,
                H2Count,
                H3Count,
                H4Count,
                H5Count,
                H6Count,
                metaKeywords,
                openGraph,
                metaRobots,
                canonicalTag,
                sitemapPresent,
                robotsTxtPresent,
                googleSearchConsole,
                faviconPresent,
                notes,
            } = req.body;

            // Validasi input
            if (!clientName
                || !websiteUrl || !auditDate || !gtmetrixGrade || !pagespeedPerformance ||
                !metaTitle || !metaDescription
            ) {
                return res.status(400).json({ message: 'Some important parameters must not be empty : website url, Audit Date, GTMetrix Grade, Page Speed Performance, Meta Title, Meta Description' });
            }

            // Menyusun objek untuk disimpan ke Firestore
            const newAudit = {
                clientName,
                websiteUrl,
                auditDate,
                gtmetrixGrade,
                gtmetrixPerformance,
                gtmetrixStructure,
                pagespeedPerformance,
                pagespeedAccessibility,
                pagespeedbestpractices,
                pageSpeedSEO,
                brokenLinksCount,
                brokenLinkurl,
                duplicateContentPercentage,
                commonContentPercentage,
                uniqueContentPercentage,
                mobileFriendly,
                metaTitle,
                metaTitleCount,
                metaDescription,
                metaDescriptionCount,
                H1Count,
                H2Count,
                H3Count,
                H4Count,
                H5Count,
                H6Count,
                metaKeywords,
                openGraph,
                metaRobots,
                canonicalTag,
                sitemapPresent,
                robotsTxtPresent,
                googleSearchConsole,
                faviconPresent,
                notes,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            };

            // Simpan data ke Firestore
            const auditRef = db.collection('audits').doc();
            await auditRef.set(newAudit);

            // Kirimkan respon ke client
            res.status(200).send({ message: 'Audit saved successfully', id: auditRef.id });
        } catch (error) {
            console.error('error saving data:', error);
            res.status(500).send({ message: 'Audit saved successfully', error });
        }
    },

    // Menghapus data audit berdasarkan ID
    deleteById: async (req, res) => {
        const { id } = req.params;

        try {
            const success = await SeoAuditModel.deleteById(id);
            if (success) {
                res.status(200).send({ message: 'Audit successfully deleted' });
            } else {
                res.status(404).send({ message: 'Audit not found' });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },

    // Menghapus semua data audit
    clear: (req, res) => {
        SeoAuditModel.clear();
        res.status(200).json({ message: 'All SEO audit data successfully deleted' });
    },

    // Mengedit data audit berdasarkan ID
    editById: (req, res) => {
        const { id } = req.params;
        const {
            clientName,
            websiteUrl,
            auditDate,
            gtmetrixGrade,
            gtmetrixPerformance,
            gtmetrixStructure,
            pagespeedPerformance,
            pagespeedAccessibility,
            pagespeedbestpractices,
            pageSpeedSEO,
            brokenLinksCount,
            brokenLinkurl,
            duplicateContentPercentage,
            commonContentPercentage,
            uniqueContentPercentage,
            mobileFriendly,
            metaTitle,
            metaTitleCount,
            metaDescription,
            metaDescriptionCount,
            H1Count,
            H2Count,
            H3Count,
            H4Count,
            H5Count,
            H6Count,
            metaKeywords,
            openGraph,
            metaRobots,
            canonicalTag,
            sitemapPresent,
            robotsTxtPresent,
            googleSearchConsole,
            faviconPresent,
            notes,
        } = req.body;

        // Validasi input
        if (!clientName
            || !websiteUrl || !auditDate || !gtmetrixGrade || !pagespeedPerformance ||
            !metaTitle || !metaDescription
        ) {
            return res.status(400).json({ message: 'Some important parameters must not be empty : website url, Audit Date, GTMetrix Grade, Page Speed Performance, Meta Title, Meta Description' });
        }

        // Memperbarui data audit
        const updatedAudit = SeoAuditModel.updateById(id, {
            clientName,
            websiteUrl,
            auditDate,
            gtmetrixGrade,
            gtmetrixPerformance,
            gtmetrixStructure,
            pagespeedPerformance,
            pagespeedAccessibility,
            pagespeedbestpractices,
            pageSpeedSEO,
            brokenLinksCount,
            brokenLinkurl,
            duplicateContentPercentage,
            commonContentPercentage,
            uniqueContentPercentage,
            mobileFriendly,
            metaTitle,
            metaTitleCount,
            metaDescription,
            metaDescriptionCount,
            H1Count,
            H2Count,
            H3Count,
            H4Count,
            H5Count,
            H6Count,
            metaKeywords,
            openGraph,
            metaRobots,
            canonicalTag,
            sitemapPresent,
            robotsTxtPresent,
            googleSearchConsole,
            faviconPresent,
            notes,
        });

        if (updatedAudit) {
            res.status(200).json({ message: 'SEO audit data updated successfully', data: updatedAudit });
        } else {
            res.status(404).json({ message: 'SEO audit data not found' });
        }
    },

    downloadPdf: async (req, res) => {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'ID audit not found' });
        }

        try {
            const auditRef = db.collection('audits').doc(id);
            const auditSnapshot = await auditRef.get();

            if (!auditSnapshot.exists) {
                return res.status(404).json({ message: 'Data audit not found' });
            }

            const audit = auditSnapshot.data(); // ambil audit data dari fire store

            // puppeteer untuk pdf
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // html untuk pdf
            const htmlContent = `                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>SEO Audit Report</title>
                        <style>
                        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
                            body {
                                font-family: 'Poppins', Arial, sans-serif;
                                margin: 20px;
                                line-height: 1.6;
                            }
                            h1, h2, h3 {
                                color: #333;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-bottom: 20px;
                                margin-top: 20px;
                            }
                            table, th, td {
                                border: 1px solid #ccc;
                            }
                            td[colspan] {
                                background-color: #f9f9f9;
                            }
                            th {
                                background-color: #f4f4f4;
                            }
                            .suggestions {
                                background-color: #f9f9f9;
                                padding: 15px;
                                border: 1px solid #ccc;
                            }
                            .check {
                                color: green;
                                font-weight: bold;
                            }
                            .cross {
                                color: red;
                                font-weight: bold;
                            }
                            .mark {
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>SEO Audit Report for ${audit.clientName}</h1>
                        <p><strong>Website:</strong> <a href="${audit.websiteUrl}" target="_blank">${audit.websiteUrl}</a></p>
                        <p><strong>Audit Date:</strong> ${new Date(audit.auditDate).toLocaleDateString()}</p>
    
                        
                        <table>
                            <thead style="text-align: center;">
                                <tr style="font-size: 25px;">
                                    <td colspan="3" ><strong>Checklist</strong></td>
                                </tr>
                                <tr style="font-size: 20px;">
                                    <th>Criteria</th>
                                    <th>Notes</th>
                                    <th>Passed</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>GTmetrix</td>
                                    <td>${audit.gtmetrixGrade || "N/A"}, Performance & Structure ${audit.gtmetrixPerformance || 0}%</td>
                                    <td class="mark ${audit.gtmetrixGrade && audit.gtmetrixPerformance && audit.gtmetrixStructure ? "check" : "cross"}">${audit.gtmetrixGrade && audit.gtmetrixPerformance && audit.gtmetrixStructure ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Pagespeed</td>
                                    <td>
                                        Performance: ${audit.pagespeedPerformance || "N/A"}<br>
                                        Accessibility: ${audit.pagespeedAccessibility || "N/A"}<br>
                                        Best Practices: ${audit.pagespeedbestpractices || "N/A"}<br>
                                        SEO: ${audit.pageSpeedSEO || "N/A"}
                                    </td>
                                    <td class="mark ${audit.pagespeedPerformance && audit.pagespeedAccessibility && audit.pagespeedbestpractices && audit.pageSpeedSEO ? "check" : "cross"}">${audit.pagespeedPerformance && audit.pagespeedAccessibility && audit.pagespeedbestpractices && audit.pageSpeedSEO ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Broken Link</td>
                                    <td>
                                        ${audit.brokenLinksCount || "Very good"}<br>
                                        ${audit.brokenLinkurl || "No Broken Links url"}
                                    </td>
                                    <td class="mark ${audit.brokenLinksCount === 0 ? "check" : "cross"}">${audit.brokenLinksCount ? "✘" : "✔"}</td>

                                </tr>
                                <tr>
                                    <td>Duplicate Content</td>
                                    <td>
                                        Duplicate Content: ${audit.duplicateContentPercentage || 0}%<br>
                                        Common Content: ${audit.commonContentPercentage || 0}%<br>
                                        Unique Content: ${audit.uniqueContentPercentage || 0}%
                                    </td>
                                    <td class="mark ${(audit.duplicateContentPercentage && audit.commonContentPercentage && audit.uniqueContentPercentage) ? 'check' : 'cross'}">${(audit.duplicateContentPercentage && audit.commonContentPercentage && audit.uniqueContentPercentage) ? '✔' : '✘'}</td>
                                </tr>
                                <tr>
                                    <td>Mobile Friendly Test</td>
                                    <td>${audit.mobileFriendly ? "Very Good" : "Needs Improvement"}</td>
                                    <td class="mark ${audit.mobileFriendly ? "check" : "cross"}">${audit.mobileFriendly ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Meta Title</td>
                                    <td>${audit.metaTitle} (${audit.metaTitleCount}/60 chars)</td>
                                    <td class="mark ${audit.metaTitle ? "check" : "cross"}">${audit.metaTitle ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Meta Description</td>
                                    <td>${audit.metaDescription} (${audit.metaDescriptionCount}/150 chars)</td>
                                    <td class="mark ${audit.metaTitle ? "check" : "cross"}">${audit.metaTitle ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Heading</td>
                                    <td>
                                        H1: ${audit.H1Count || "No"},
                                        H2: ${audit.H2Count || "No"},
                                        H3: ${audit.H3Count || "No"},
                                        H4: ${audit.H4Count || "No"},
                                        H5: ${audit.H5Count || "No"},
                                        H6: ${audit.H6Count || "No"}
                                    </td>
                                    <td class="mark ${audit.H1Count && audit.H2Count && audit.H3Count && audit.H4Count && audit.H5Count && audit.H6Count ? "check" : "cross"}">${audit.H1Count && audit.H2Count && audit.H3Count && audit.H4Count && audit.H5Count && audit.H6Count ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Meta Robots</td>
                                    <td>${audit.metaRobots ? "Available" : "Not Available"}</td>
                                    <td class="mark ${audit.metaRobots ? "check" : "cross"}">${audit.metaRobots ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Meta Keywords</td>
                                    <td>${audit.metaKeywords ? "Available" : "Not Available"}</td>
                                    <td class="mark ${audit.metaKeywords ? "check" : "cross"}">${audit.metaKeywords ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Open Graph</td>
                                    <td>${audit.openGraph ? "Available" : "There is no image, missing open graph"}</td>
                                    <td class="mark ${audit.openGraph ? "check" : "cross"}">${audit.openGraph ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Canonical Tag</td>
                                    <td>${audit.canonicalTag ? "Available" : "Not Available"}</td>
                                    <td class="mark ${audit.canonicalTag ? "check" : "cross"}">${audit.canonicalTag ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Sitemap</td>
                                    <td>${audit.sitemapPresent ? "Available" : "Not Available"}</td>
                                    <td class="mark ${audit.sitemapPresent ? "check" : "cross"}">${audit.sitemapPresent ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Robots.txt</td>
                                    <td>${audit.robotsTxtPresent ? "Available" : "Not Available"}</td>
                                    <td class="mark ${audit.robotsTxtPresent ? "check" : "cross"}">${audit.robotsTxtPresent ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Google Analytics</td>
                                    <td>${audit.googleSearchConsole ? "Installed" : "Not Installed"}</td>
                                    <td class="mark ${audit.googleSearchConsole ? "check" : "cross"}">${audit.googleSearchConsole ? "✔" : "✘"}</td>
                                </tr>
                                <tr>
                                    <td>Favicon</td>
                                    <td>${audit.faviconPresent ? "Available" : "Not Available"}</td>
                                    <td class="mark ${audit.faviconPresent ? "check" : "cross"}">${audit.faviconPresent ? "✔" : "✘"}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table>
                            <thead style="text-align: center; font-size: 25px;">
                                <tr>
                                    <td colspan="3"><strong>Suggestions</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="3" style="white-space: pre-wrap; page-break-inside: avoid;">${audit.notes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </body>
                </html>
            `;

            await page.setContent(htmlContent);

            // definisi path untuk sava pdf
            const pdfPath = path.resolve(__dirname, '../pdfs', `SEO_Audit_${id}.pdf`);

            // buat pdf dan nyimpen
            await page.pdf({ path: pdfPath, format: 'A4' });

            await browser.close();

            // kirim pdf file untuk di donlot
            res.download(pdfPath, (err) => {
                if (err) {
                    res.status(500).json({ message: 'An error occurred while downloading the PDF file' });
                }

                // apus pdf habis donlot
                fs.unlinkSync(pdfPath);
            });
        } catch (error) {
            console.error('Error creating PDF: ', error);
            res.status(500).json({ message: 'Error creating PDF:' });
        }
    },


};

module.exports = SeoAuditController;
