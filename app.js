/*
Explanation:

1. Required necessary modules: express, fs, and csv-parse.
2. I created an instance of the Express application and specify the port number.
3. Used express.static('public') middleware to serve static files from the public directory.
4. I read the pod_data.csv file synchronously using fs.readFileSync() and store the contents in the csvData variable.
5. Parse the CSV data using csv.parse() and specify the options to treat the first row as column headers and skip empty lines. The parsed data is stored in the records variable.
6. Define a route /api/data that responds with the records array as JSON when accessed.
7. Define a route /api/data/:company that responds with the records filtered by the specified company name when accessed.
8. Define a route /api/companies that responds with an array of unique company names when accessed.
9. Start the server and listen on the specified port, logging a message when the server starts running.
*/

const fs = require("fs");
const csv = require("csv-parse/sync");

const csvData = fs.readFileSync("pod_data.csv", "utf8");
const records = csv.parse(csvData, { columns: true, skip_empty_lines: true });

const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/api/data", (req, res) => {
  res.json(records);
});

app.get("/api/data/:company", (req, res) => {
  const company = req.params.company;
  const companyData = records.filter((record) => record.Customer === company);
  res.json(companyData);
});

app.get("/api/companies", (req, res) => {
  const companies = [...new Set(records.map((record) => record.Customer))];
  res.json(companies);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
