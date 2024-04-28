/*
Explanation:

1. We require the necessary modules: express, fs, and csv-parse.
2. We create an instance of the Express application and specify the port number.
3. We use express.static('public') middleware to serve static files from the public directory.
4. We read the pod_data.csv file synchronously using fs.readFileSync() and store the contents in the csvData variable.
5. We parse the CSV data using csv.parse() and specify the options to treat the first row as column headers and skip empty lines. The parsed data is stored in the records variable.
6. We define a route /api/data that responds with the records array as JSON when accessed.
7. We define a route /api/data/:company that responds with the records filtered by the specified company name when accessed.
8. We define a route /api/companies that responds with an array of unique company names when accessed.
9. We start the server and listen on the specified port, logging a message when the server starts running.
*/

// require the necessary modules
const fs = require('fs');
const csv = require('csv-parse/sync');

// read the CSV file synchronously
const csvData = fs.readFileSync('pod_data.csv', 'utf8');
const records = csv.parse(csvData, { columns: true, skip_empty_lines: true });

// create an Express application
const express = require('express');
const app = express();
const port = 3000;

// serve static files from the public directory
app.use(express.static('public'));

// returns all records
app.get('/api/data', (req, res) => {
  res.json(records);
});

// returns records filtered by company name
app.get('/api/data/:company', (req, res) => {
  const company = req.params.company;
  const companyData = records.filter(record => record.Customer === company);
  res.json(companyData);
});

// returns an array of unique company names
app.get('/api/companies', (req, res) => {
    const companies = [...new Set(records.map(record => record.Customer))];
    res.json(companies);
  });

// start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
