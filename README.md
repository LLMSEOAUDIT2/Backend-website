# API Documentation

## Authentication Endpoints

### Login
**Endpoint:**
`POST /auth/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**

- **Success:**
  ```json
  {
    "message": "Login successful"
  }
  ```

- **Failure:**
  ```json
  {
    "error": "user not found"
  }
  ```

### Register
**Endpoint:**
`POST /auth/signup`

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**

- **Success:**
  ```json
  {
    "message": "Signup successful"
  }
  ```

- **Failure:**
  ```json
  {
    "error": "Username already exists"
  }
  ```

## SEO Audit Endpoints

### Send Data Audit
**Endpoint:**
`POST /seoAudit/post`

**Request Body:**
```json
{
  "clientName": "Client Y",
  "websiteUrl": "https://google.com.com",
  "auditDate": "6/1/2023",
  "gtmetrixGrade": "A",
  "gtmetrixPerformance": "85%",
  "gtmetrixStructure": "80%",
  "pagespeedPerformance": "90%",
  "pagespeedAccessibility": "75%",
  "pagespeedBestPractices": "88%",
  "pageSpeedSEO": "82%",
  "brokenLinksCount": 3,
  "brokenLinkUrl": "https://example.com/broken-links",
  "duplicateContentPercentage": "12%",
  "commonContentPercentage": "45%",
  "uniqueContentPercentage": "43%",
  "mobileFriendly": "Yes",
  "metaTitle": "Example Page Title",
  "metaTitleCount": 1,
  "metaDescription": "Example meta description.",
  "metaDescriptionCount": 1,
  "H1Count": 1,
  "H2Count": 1,
  "H3Count": 2,
  "H4Count": 1,
  "H5Count": 1,
  "H6Count": 1,
  "metaKeywords": "example, keywords",
  "openGraph": "Implemented",
  "metaRobots": "yes",
  "canonicalTag": "yes",
  "sitemapPresent": "yes",
  "robotsTxtPresent": "yes",
  "googleSearchConsole": "yes",
  "faviconPresent": "yes",
  "notes": "this is a sample audit"
}
```

**Response:**

- **Success:**
  ```json
  {
    "message": "Audit saved successfully"
  }
  ```

- **Failure:**
  ```json
  {
    "error": "Some important parameters must not be empty: website url, Audit Date, GTMetrix Grade, Page Speed Performance, Meta Title, Meta Description"
  }
  ```

### Get Data Audit
**Endpoint:**
`GET /seoAudit/get`

**Response:**
```json
{
  "clientName": "Client Y",
  "websiteUrl": "https://google.com.com",
  "auditDate": "6/1/2023",
  "gtmetrixGrade": "A",
  "gtmetrixPerformance": "85%",
  "gtmetrixStructure": "80%",
  "pagespeedPerformance": "90%",
  "pagespeedAccessibility": "75%",
  "pagespeedBestPractices": "88%",
  "pageSpeedSEO": "82%",
  "brokenLinksCount": 3,
  "brokenLinkUrl": "https://example.com/broken-links",
  "duplicateContentPercentage": "12%",
  "commonContentPercentage": "45%",
  "uniqueContentPercentage": "43%",
  "mobileFriendly": "Yes",
  "metaTitle": "Example Page Title",
  "metaTitleCount": 1,
  "metaDescription": "Example meta description.",
  "metaDescriptionCount": 1,
  "H1Count": 1,
  "H2Count": 1,
  "H3Count": 2,
  "H4Count": 1,
  "H5Count": 1,
  "H6Count": 1,
  "metaKeywords": "example, keywords",
  "openGraph": "Implemented",
  "metaRobots": "yes",
  "canonicalTag": "yes",
  "sitemapPresent": "yes",
  "robotsTxtPresent": "yes",
  "googleSearchConsole": "yes",
  "faviconPresent": "yes",
  "notes": "this is a sample audit"
}
```

**Response:**

- **Failure:**
  ```json
  {
    "error": "An error occurred while retrieving the data"
  }
  ```

### Get Data Audit by ID
**Endpoint:**
`GET /seoAudit/get/:id`

**Response:**
```json
{
  "id": "xxxxxxxxxx",
  "clientName": "Client Y",
  "websiteUrl": "https://google.com.com",
  "auditDate": "6/1/2023",
  "gtmetrixGrade": "A",
  "gtmetrixPerformance": "85%",
  "gtmetrixStructure": "80%",
  "pagespeedPerformance": "90%",
  "pagespeedAccessibility": "75%",
  "pagespeedBestPractices": "88%",
  "pageSpeedSEO": "82%",
  "brokenLinksCount": 3,
  "brokenLinkUrl": "https://example.com/broken-links",
  "duplicateContentPercentage": "12%",
  "commonContentPercentage": "45%",
  "uniqueContentPercentage": "43%",
  "mobileFriendly": "Yes",
  "metaTitle": "Example Page Title",
  "metaTitleCount": 1,
  "metaDescription": "Example meta description.",
  "metaDescriptionCount": 1,
  "H1Count": 1,
  "H2Count": 1,
  "H3Count": 2,
  "H4Count": 1,
  "H5Count": 1,
  "H6Count": 1,
  "metaKeywords": "example, keywords",
  "openGraph": "Implemented",
  "metaRobots": "yes",
  "canonicalTag": "yes",
  "sitemapPresent": "yes",
  "robotsTxtPresent": "yes",
  "googleSearchConsole": "yes",
  "faviconPresent": "yes",
  "notes": "this is a sample audit"
}
```

**Response:**

- **Failure:**
  ```json
  {
    "error": "ID document not valid"
  }
  ```

### Update Data Audit
**Endpoint:**
`PUT /seoAudit/update/:id`

**Response:**
```json
{
  "id": "xxxxxxxx",
  "clientName": "Client Y",
  "websiteUrl": "https://google.com.com",
  "auditDate": "6/1/2023",
  "gtmetrixGrade": "A",
  "gtmetrixPerformance": "85%",
  "gtmetrixStructure": "80%",
  "pagespeedPerformance": "90%",
  "pagespeedAccessibility": "75%",
  "pagespeedBestPractices": "88%",
  "pageSpeedSEO": "82%",
  "brokenLinksCount": 3,
  "brokenLinkUrl": "https://example.com/broken-links",
  "duplicateContentPercentage": "12%",
  "commonContentPercentage": "45%",
  "uniqueContentPercentage": "43%",
  "mobileFriendly": "Yes",
  "metaTitle": "Example Page Title",
  "metaTitleCount": 1,
  "metaDescription": "Example meta description.",
  "metaDescriptionCount": 1,
  "H1Count": 1,
  "H2Count": 1,
  "H3Count": 2,
  "H4Count": 1,
  "H5Count": 1,
  "H6Count": 1,
  "metaKeywords": "example, keywords",
  "openGraph": "Implemented",
  "metaRobots": "yes",
  "canonicalTag": "yes",
  "sitemapPresent": "yes",
  "robotsTxtPresent": "yes",
  "googleSearchConsole": "yes",
  "faviconPresent": "yes",
  "notes": "this is a sample audit"
}
```

**Response:**

- **Success:**
  ```json
  {
    "message": "SEO audit data updated successfully"
  }
  ```

- **Failure:**
  ```json
  {
    "error": "SEO audit data not found"
  }
  ```


### Download Audit PDF
**Endpoint:**
`GET /seoAudit/download-pdf/:id`

**Response:**
```json
{
  "id": "xxxxxxxxxx",
  "clientName": "Client Y",
  "websiteUrl": "https://google.com.com",
  "auditDate": "6/1/2023",
  "gtmetrixGrade": "A",
  "gtmetrixPerformance": "85%",
  "gtmetrixStructure": "80%",
  "pagespeedPerformance": "90%",
  "pagespeedAccessibility": "75%",
  "pagespeedBestPractices": "88%",
  "pageSpeedSEO": "82%",
  "brokenLinksCount": 3,
  "brokenLinkUrl": "https://example.com/broken-links",
  "duplicateContentPercentage": "12%",
  "commonContentPercentage": "45%",
  "uniqueContentPercentage": "43%",
  "mobileFriendly": "Yes",
  "metaTitle": "Example Page Title",
  "metaTitleCount": 1,
  "metaDescription": "Example meta description.",
  "metaDescriptionCount": 1,
  "H1Count": 1,
  "H2Count": 1,
  "H3Count": 2,
  "H4Count": 1,
  "H5Count": 1,
  "H6Count": 1,
  "metaKeywords": "example, keywords",
  "openGraph": "Implemented",
  "metaRobots": "yes",
  "canonicalTag": "yes",
  "sitemapPresent": "yes",
  "robotsTxtPresent": "yes",
  "googleSearchConsole": "yes",
  "faviconPresent": "yes",
  "notes": "this is a sample audit"
}
```


**Response:**

- **Failure:**
  ```json
  {
    "error": "An error occurred while downloading the PDF file"
  }
  ```
