// 막대 그래프 차트 만들기
const Days = [
  "02",
  "04",
  "06",
  "08",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
  "24",
  "26",
  "28",
  "30",
];

const scatterDataSet = {
  labels: Days,
  datasets: [
    {
      type: "bar",
      label: "Bar Dataset",
      data: [10, 15, 5, 4, 20, 18, 30, 25, 26, 16, 40, 30, 25, 26, 16],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "#38c976",
      barThickness: 10,
    },
    {
      type: "line",
      label: "Line Dataset",
      data: [10, 15, 5, 4, 20, 18, 30, 25, 26, 16, 40, 30, 25, 26, 16],
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

const spendingPrice = document.querySelector(".spending-price");

let monthlySum = 0;

console.log(monthlySum);

const itemsContainer = document.querySelector(".spending-items-container");

for (let i = 0; i < spendingList.length; i++) {
  monthlySum += spendingList[i].price;

  const items = document.createElement("li");
  items.classList.add("items-list");

  itemsContainer.appendChild(items);
  const itemName = document.createElement("span");
  itemName.classList.add("item-name");
  items.appendChild(itemName);
  itemName.textContent = spendingList[i].item;

  const itemPrice = document.createElement("span");
  itemPrice.classList.add("item-price");
  items.appendChild(itemPrice);
  itemPrice.textContent = spendingList[i].price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

spendingPrice.textContent = `${monthlySum
  .toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;
