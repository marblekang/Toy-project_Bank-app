// dataList 변수로 json 데이터를 받아서 ,
//그 안에 bankList 라는 객체 배열에 접근하고 싶습니다 ㅠㅠ

//json 데이터 가져오기
async function fetchList() {
  let response = await fetch(
    `https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f6e4d3d3-c52c-4ea8-b665-968a3b17c5ea/bank.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220506%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220506T071024Z&X-Amz-Expires=86400&X-Amz-Signature=b64692ad33e835d4c2d70f4c02e816a19d8f2d396044b54537386174238ceaf5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bank.json%22&x-id=GetObject`
  );
  const obj = await response.json();
  console.log(obj.bankList[0]);
  //여기서 뭔가 실행
  for (let i = 0; i < obj.bankList.length; i++) {
    const ulList = document.createElement("ul");
    ulList.setAttribute("class", "ul-list");

    const liList = document.createElement("li");
    liList.setAttribute("class", "li-list");

    const historyTitle = document.createElement("div");
    historyTitle.setAttribute("class", "history-title");

    const date = document.createElement("span");
    date.setAttribute("class", "date");

    const sumSpending = document.createElement("span");
    sumSpending.setAttribute("class", "sum-spending");

    const dailyList = document.createElement("div");
    dailyList.setAttribute("class", "daily-list");

    const item = document.createElement("span");
    item.setAttribute("class", "daily-list-item");

    const price = document.createElement("span");
    price.setAttribute("class", "daily-list-price");

    const todayHistory = document.querySelector(".today-history");

    // append
    todayHistory.appendChild(ulList);

    ulList.appendChild(liList);

    liList.appendChild(historyTitle);

    historyTitle.appendChild(date); //오늘 2일전 3일전

    historyTitle.appendChild(sumSpending); //사용금액 합계

    liList.appendChild(dailyList);

    dailyList.appendChild(item); //건 별 사용내역
    item.textContent = obj.bankList[i].history;
    dailyList.appendChild(price); // 건 별 사용금액
    price.textContent = obj.bankList[i].price;
  }
}

fetchList();

/*
function setClassName(el, name) {
  el.setAttribute("class", name);
}
 */
