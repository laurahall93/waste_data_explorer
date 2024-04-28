# Waste Data Explorer

Waste Data Explorer is a web application that visualizes waste data using Node.js, Express.js, and Chart.js. It allows users to view and filter waste data by waste type and displays the data in an interactive bar chart.

## Installation

1. Make sure you have Node.js installed on your machine. You can download it from the official website: [https://nodejs.org](https://nodejs.org)

2. Clone the repository or download the source code:

   ```bash
   git clone https://github.com/your-username/waste-data-explorer.git
   ```

3. Navigate to the project directory:

   ```bash
   cd waste-data-explorer
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the application:

   ```bash
   node app.js
   ```

2. Open your web browser and visit `http://localhost:3000` to access the application.

3. Use the dropdown menu to filter the waste data by waste type.

4. Click the "Filter" button to apply the selected filter and update the chart.

## Data

The waste data is stored in the `pod_data.csv` file. The file contains the following columns:

- Customer
- Site
- Year
- Month
- Waste Type
- Estimated quantity (kg)
- Actual quantity (kg)

## Technologies Used

- Node.js
- Express.js
- Chart.js
- CSV Parse

## Project Structure

- `app.js`: The main server file that handles data ingestion and serves the API endpoints.
- `public/index.html`: The HTML file that displays the user interface and chart.
- `public/script.js`: The JavaScript file that fetches data from the server, handles user interactions, and updates the chart.
- `pod_data.csv`: The CSV file containing the waste data.

## Author

Laura Hall Holla
