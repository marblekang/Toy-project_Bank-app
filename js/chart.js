// 막대 그래프 차트 만들기
const Days = ["02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"];

const scatterDataSet = {
  labels: Days,
  datasets: [
    {
      type: "bar",
      label: "Bar Dataset",
      data: [10, 15, 5, 4, 20, 18, 30, 25, 26, 16, 40],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "#38c976",
    },
    {
      type: "line",
      label: "Line Dataset",
      data: [10, 15, 5, 4, 20, 18, 30, 25, 26, 16, 40],
      fill: false,
      borderColor: "#FF5F00",
    },
  ],
};

const configReport = {
  type: "scatter",
  data: scatterDataSet,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const myChart = new Chart(document.querySelector("#myChart"), configReport);

// 도넛 모양 차트 만들기

const pattenDataSet = {
  labels: ["oiling", "health", "eatout", "shopping", "mart"],
  datasets: [
    {
      data: [56, 80, 233, 390, 46],
      backgroundColor: ["#FEC229", "#C4C4C4", "#00BDB2", "#BD5B00", "#0057BD"],
      cutout: 110,
    },
  ],
};

const configPatten = {
  type: "doughnut",
  data: pattenDataSet,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

const myPattern = new Chart(document.getElementById("myPattern"), configPatten);

// 6월 항목 묶음
const spendingList = [
  { item: "주유비", price: 56000 },
  { item: "건강관리비", price: 80000 },
  { item: "외식비", price: 233000 },
  { item: "장보기", price: 390000 },
  { item: "상점", price: 46000 },
];

const itemsContainer = document.querySelector(".spending-items-container");
itemsContainer.appendChild(items);
itemsContainer.innerText = "안녕";

const items = document.createElement("div");
items.classList.add("items-list");
items.appendChild(itemName);
items.appendChild(itemPrice);

const itemName = document.createElement("span");
itemName.classList.add("item-name");

const itemPrice = document.createElement("span");
itemPrice.classList.add("item-price");
