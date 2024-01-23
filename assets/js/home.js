let boxes = document.querySelector(".boxes");
const BASE_URL = "http://localhost:3000";
let arr = [];
let newArr = [];
let asc = document.querySelector(".button-asc");
async function getData() {
  let res = await axios.get(`${BASE_URL}/products`);
  console.log(res.data);
  drawCards(res.data);
  arr = res.data;
  newArr = [...arr];
}

getData();

function drawCards(params) {
  boxes.innerHTML = "";

  params.forEach((el) => {
    boxes.innerHTML += `<div class="box">
        <img src="${el.url}" alt="${el.url}" />
        <img class="stars" src="./assets/img/download.jfif" alt="" />
        <a href="./details.html?id=${el.id}">See Details</a>
        <p>
          $${el.newPrice} <span>$${el.oldPrice}</span>
        </p>
      </div>`;
  });
}

asc.addEventListener("click", function (e) {
  if (asc.innerText === "Ascending") {
    asc.innerText = "Descending";
    let sorted = arr.sort((a, b) => a.newPrice - b.newPrice);
    drawCards(sorted);
  } else if (asc.innerText === "Descending") {
    asc.innerText = "Defaulth";
    let sorted = arr.sort((a, b) => b.newPrice - a.newPrice);
    drawCards(sorted);
  } else {
    asc.innerText = "Ascending";
    drawCards(newArr);
  }
});
