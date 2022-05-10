// JSON 데이터 바인딩하기
async function fetchList() {
  let response = await fetch(
    `https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f6e4d3d3-c52c-4ea8-b665-968a3b17c5ea/bank.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220508%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220508T122053Z&X-Amz-Expires=86400&X-Amz-Signature=bd8a004f23f2ef917225bce8bd5465e7a47fcac6769dfdbfb44ca0b2a48bcb61&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bank.json%22&x-id=GetObject`
  );
  const obj = await response.json();
  console.log(obj.bankList);

  //날짜 데이터만 중복 없이 추출
  let newDate;
  let sum = 0;
  function drawDate() {
    let temp = [];
    for (let i = 0; i < obj.bankList.length; i++) {
      temp.push(obj.bankList[i].date);
    }
    newDate = [...new Set(temp)];
  }
  drawDate();
  console.log(newDate);

  // 날짜별 데이터 배열 만들기
  const dateMap = obj.bankList.reduce((previousValue, currentValue) => {
    const currDate = currentValue.date;
    previousValue[currDate] = Object.keys(previousValue).includes(currDate)
      ? [...previousValue[currDate], currentValue]
      : [currentValue];
    return previousValue;
  }, {});

  const newSum = Object.keys(dateMap).reduce(
    (previousValue, currentValue) => [...previousValue, dateMap[currentValue]],
    []
  );
  ////////////////////////

  // 날짜별 사용금액 합산한 배열 만들기
  let priceSumArr = [];
  for (let i = 0; i < newDate.length; i++) {
    priceSumArr[i] = 0;
    for (let j = 0; j < newSum[i].length; j++) {
      if (newSum[i][j].income == "out") {
        priceSumArr[i] -= newSum[i][j].price;
      } else {
        priceSumArr[i] += newSum[i][j].price;
      }
    }
  }

  console.log(priceSumArr);

  // 날짜별로 item만 뽑아서 배열로
  let items = []; //30
  for (let i = 0; i < newDate.length; i++) {
    items[i] = [];
    for (let j = 0; j < newSum[i].length; j++) {
      items[i].push(newSum[i][j].history);
    }
  }
  ///////////////////////////////////

  // 날짜별 지출액만 뽑아서 배열로
  let priceList = []; //30
  for (let i = 0; i < newDate.length; i++) {
    priceList[i] = [];
    for (let j = 0; j < newSum[i].length; j++) {
      priceList[i].push(newSum[i][j].price);
    }
  }
  /////////////////////////////////

  const todayHistory = document.querySelector(".today-history");
  for (let i = 0; i < newDate.length; i++) {
    const historyTitle = document.createElement("div");
    historyTitle.setAttribute("class", "history-title");

    const date = document.createElement("span");
    date.setAttribute("class", "date");

    const sumSpending = document.createElement("span");
    sumSpending.setAttribute("class", "sum-spending");

    const divEl = document.createElement("div");

    todayHistory.appendChild(divEl);

    divEl.appendChild(historyTitle);

    historyTitle.appendChild(date); //오늘 2일전 3일전
    date.innerHTML = newDate[i];
    historyTitle.appendChild(sumSpending); //사용금액 합계
    sumSpending.innerHTML = priceSumArr[i]
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    for (let j = 0; j < newSum[i].length; j++) {
      const ulList = document.createElement("ul");
      ulList.setAttribute("class", "ul-list");

      const liList = document.createElement("li");
      liList.setAttribute("class", "li-list");

      const dailyList = document.createElement("div");
      dailyList.setAttribute("class", "daily-list");

      const item = document.createElement("span");
      item.setAttribute("class", "daily-list-item");

      const price = document.createElement("span");
      price.setAttribute("class", "daily-list-price");

      divEl.appendChild(ulList);

      ulList.appendChild(liList);

      liList.appendChild(dailyList);

      dailyList.appendChild(item); //건 별 사용내역
      item.innerText = items[i][j];
      dailyList.appendChild(price); // 건 별 사용금액
      if (newSum[i][j].income === "out") {
        price.innerText = `-${priceList[i][j]
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      } else if (newSum[i][j].income === "in") {
        price.innerText = `+${priceList[i][j]
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      }
    }
  }

  console.log(newSum);
}

fetchList();

// 드래그 UI
const dragBtn = document.querySelector(".slider-container");
dragBtn.addEventListener("click", function () {
  document.querySelector(".history").classList.toggle("drag-change");
  document
    .querySelector(".daily-history-container")
    .classList.toggle("height-change");
});
