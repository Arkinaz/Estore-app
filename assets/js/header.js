let bars = document.querySelector(".fa-bars");
let nav = document.querySelector(".responsive-menu");
let headerBtm = document.querySelector(".header-bottom");
let headerTop = document.querySelector(".header-top");
let basketIcon = document.querySelector(".basket-page");

bars.addEventListener("click", function () {
  nav.classList.toggle("show");
  bars.classList.toggle("fa-x");
});

window.addEventListener("scroll", function () {
  if (this.scrollY > 300) {
    headerTop.classList.add("visible");
    headerBtm.style.position = "fixed";
  } else {
    headerBtm.style.position = "static";
    headerTop.classList.remove("visible");
  }
});

basketIcon.addEventListener("click", function () {
  window.location = "basket.html";
});
