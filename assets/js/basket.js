let basket = JSON.parse(localStorage.getItem("basket")) ?? [];
let boxes = document.querySelector(".boxes");

basket.forEach((el) => {
  boxes.innerHTML += `<div class="box">
        <img src="${el.obj.url}" alt="${el.obj.url}" />
        <img class="stars" src="./assets/img/download.jfif" alt="" />
        <a href="./details.html?id=${el.obj.id}">See Details</a>
        <p>
          $${el.obj.newPrice} <span>$${el.obj.oldPrice}</span>
        </p>
        <div class="icons">
        <i onclick=deleteFromBasket("${el.obj.id}",this) class="fa-solid fa-trash-can"></i>
        <i class="fa-regular fa-heart"></i>
      </div>
      </div>`;
});

function deleteFromBasket(id, btn) {
  basket = basket.filter((el) => el.obj.id !== id);
  btn.closest(".box").remove();
  localStorage.setItem("basket", JSON.stringify(basket));
}
