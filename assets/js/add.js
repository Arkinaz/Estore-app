let allInputs = document.querySelectorAll(".input");
let form = document.querySelector("form");
let tBody = document.querySelector("tbody");
const BASE_URL = "http://localhost:3000";
let editStatus = false;
let idEdit;
let arr = [];
let search = document.querySelector(".search-this");
async function getData() {
  let res = await axios.get(`${BASE_URL}/products`);
  console.log(res.data);
  drawTable(res.data);
  arr = res.data;
}

getData();

function drawTable(item) {
  tBody.innerHTML = "";
  item.forEach((el) => {
    tBody.innerHTML += `<tr>
        <td>${el.id}</td>
        <td><img src="${el.url}" alt=""/></td>
        <td>${el.title}</td>
        <td>${el.desc}</td>
        <td>${el.newPrice}</td>
        <td>${el.oldPrice}</td>
        <td><i onclick=editThis("${el.id}") class="fa-solid fa-pen"></i>
       
        
        </td>
        <td> <i onclick=deleteThis("${el.id}",this) class="fa-solid fa-trash-can"></i>
        </td>
      </tr>`;
  });
}

async function deleteThis(id, btn) {
  if (confirm("are u sure to delete this??")) {
    await axios.delete(`${BASE_URL}/products/${id}`);
    btn.parentElement.parentElement.remove();
  }

  editStatus = false;
}
async function editThis(id) {
  editStatus = true;
  let res = await axios.get(`${BASE_URL}/products/${id}`);
  allInputs[0].value = res.data.url;
  allInputs[1].value = res.data.title;
  allInputs[2].value = res.data.newPrice;
  allInputs[3].value = res.data.oldPrice;
  allInputs[4].value = res.data.desc;
  idEdit = id;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    url: allInputs[0].value,
    title: allInputs[1].value,
    newPrice: allInputs[2].value,
    oldPrice: allInputs[3].value,
    desc: allInputs[4].value,
  };
  if (
    allInputs[0].value !== "" &&
    allInputs[1].value !== "" &&
    allInputs[2].value !== "" &&
    allInputs[3].value !== "" &&
    allInputs[4].value !== ""
  ) {
    if (!editStatus) {
      axios.post(`${BASE_URL}/products`, obj);
    } else {
      axios.patch(`${BASE_URL}/products/${idEdit}`, obj);
    }
  } else {
    allInputs.forEach((e) => (e.style.border = "1px solid red"));
  }
});

search.addEventListener("input", function (e) {
  let filtered = arr.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});
