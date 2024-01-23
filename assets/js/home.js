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
        <p>
          ${el.title}
        </p>
        <a href="./details.html?id=${el.id}">See Details</a> 
        
        <p>
          $${el.newPrice} <span>$${el.oldPrice}</span>
        </p>
       
        <div class="icons">
        <i onclick=addToBasket("${el.id}") class="fa-solid fa-basket-shopping"></i>
        <i class="fa-regular fa-heart"></i>
      </div>
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

let basket = JSON.parse(localStorage.getItem("basket")) ?? [];

function addToBasket(id) {
  let find = newArr.find((el) => el.id == id);
  let index = basket.findIndex((el) => el.obj.id == id);

  if (index === -1) {
    basket.push({ count: 1, obj: find });
  } else {
    basket[index].count += 1;
  }
  localStorage.setItem("basket", JSON.stringify(basket));
}
