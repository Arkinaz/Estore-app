let id = new URLSearchParams(window.location.search).get("id");
let boxes = document.querySelector(".boxes");
const BASE_URL = "http://localhost:3000";
async function getData() {
  let res = await axios.get(`${BASE_URL}/products/${id}`);
  let el = res.data;
  boxes.innerHTML = `<div class="box">
  <img src="${el.url}" alt="${el.url}" />
  <div class="text"><img class="stars" src="./assets/img/download.jfif" alt="" />
  <button class="blue-button" onclick="window.history.back()">Go Back</button>
  <span>
    ${el.desc}
  </span>
  <p>
    $${el.newPrice} <span>$${el.oldPrice}</span>
  </p></div>
</div>`;
}

getData();
