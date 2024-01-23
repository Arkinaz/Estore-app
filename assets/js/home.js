let boxes = document.querySelector(".boxes");
const BASE_URL = "http://localhost:3000";
async function getData() {
  let res = await axios.get(`${BASE_URL}/products`);
  console.log(res.data);
  drawCards(res.data);
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
