let baseLink =
  "http://martanetza.com/kea/cms/Dyczkowski/wordpress/wp-json/wp/v2/";
let PaintingCatLink =
  "http://martanetza.com/kea/cms/Dyczkowski/wordpress/wp-json/wp/v2/paintings";
let PhotoCatLink =
  "http://martanetza.com/kea/cms/Dyczkowski/wordpress/wp-json/wp/v2/photo";
let menu = document.querySelector(".navigation ul");
let menu1 = document.querySelector(".sub_menu_1");
let menu2 = document.querySelector(".sub_menu_2");
const params = new URLSearchParams(window.location.search);
const filterID = params.get("filterid");

//creating submenu for paintings

fetch(PaintingCatLink)
  .then(promise => promise.json())
  .then(data => buildPaintingCategories(data));

function buildPaintingCategories(data) {
  let alljson = [];
  data.forEach(elm => alljson.push(elm));

  function my() {
    alljson.sort(function(a, b) {
      return a.description - b.description;
    });

    console.log(alljson);
  }
  my();

  alljson.forEach(category => {
    const newLink = document.createElement("a");
    const newName = document.createElement("h2");
    newLink.textContent = category.name;
    menu1.appendChild(newLink);
    newLink.href = "painting.html?filterid=" + category.id;

    console.log(category.description);
  });
}
//creating submenu for photography

fetch(PhotoCatLink)
  .then(promise => promise.json())
  .then(data => buildPhotoCategories(data));

function buildPhotoCategories(data) {
  data.forEach(category => {
    const newLink = document.createElement("a");
    newLink.textContent = category.name;
    newLink.href = "photography.html?filterid=" + category.id;
    menu2.appendChild(newLink);
  });
}

//burger menu

MenuOpen = false;
console.log(MenuOpen);

document.querySelector(".burgerIcon").addEventListener("click", () => {
  if (!MenuOpen) {
    document.querySelector(".navigation").style.display = "block";
    MenuOpen = true;
  } else {
    document.querySelector(".navigation").style.display = "none";
    MenuOpen = false;
  }
});

function loadSVG2() {
  fetch("podpis.svg")
    .then(res => res.text())
    .then(svgdata => {
      document
        .querySelector(".signature")
        .insertAdjacentHTML("afterbegin", svgdata);
      drawPath();
    });
}

loadSVG2();

function drawPath() {
  const ps = document.querySelector(".cls-16 ");
  const psAll = document.querySelectorAll(".followingLine");

  console.log(psAll);
  ps.classList.add("draw");
  for (let i = 0; i < psAll.length - 1; i++) {
    psAll[i].addEventListener("animationend", () => {
      psAll[i + 1].classList.add("draw");
    });
  }
}
