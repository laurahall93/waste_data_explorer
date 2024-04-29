const companySelect = document.getElementById("companySelect");
const wasteTypeFilter = document.getElementById("wasteType");
const chartCanvas = document.getElementById("chart");

let chartInstance = null;
let data = [];

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function populateCompanySelect() {
  const companies = await fetchData("/api/companies");
  companies.forEach((company) => {
    const option = document.createElement("option");
    option.value = company;
    option.textContent = company;
    companySelect.appendChild(option);
  });
}

async function fetchCompanyData(company) {
  const url = company
    ? `/api/data/${encodeURIComponent(company)}`
    : "/api/data";
  data = await fetchData(url);
  updateWasteTypeFilter();
  updateChart();
}

function updateWasteTypeFilter() {
  wasteTypeFilter.innerHTML = '<option value="">All</option>';
  const wasteTypes = [...new Set(data.map((record) => record["Waste Type"]))];
  wasteTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    wasteTypeFilter.appendChild(option);
  });
}

function updateChart() {
  const selectedWasteType = wasteTypeFilter.value;
  const filteredData = selectedWasteType
    ? data.filter((record) => record["Waste Type"] === selectedWasteType)
    : data;

  const labels = filteredData.map(
    (record) => `${record.Customer} - ${record.Site}`
  );
  const estimatedData = filteredData.map(
    (record) => record["Estimated quantity (kg)"]
  );
  const actualData = filteredData.map(
    (record) => record["Actual quantity (kg)"]
  );

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Estimated Quantity",
          data: estimatedData,
          backgroundColor: "rgba(75, 192, 192, 0.8)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Actual Quantity",
          data: actualData,
          backgroundColor: "rgba(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            fontColor: "#555",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            fontColor: "#555",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            fontColor: "#555",
          },
        },
        title: {
          display: true,
          text: "Waste Quantity Comparison",
          fontColor: "#333",
          fontSize: 16,
        },
      },
    },
  });
}

// Event listeners
companySelect.addEventListener("change", () => {
  const selectedCompany = companySelect.value;
  fetchCompanyData(selectedCompany);
});

wasteTypeFilter.addEventListener("change", updateChart);

// Initialize the application
async function init() {
  await populateCompanySelect();
  await fetchCompanyData();
}

init();
