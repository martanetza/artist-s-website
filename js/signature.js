function loadSVG2() {
  fetch("podpis.svg")
    .then(res => res.text())
    .then(svgdata => {
      document
        .querySelector(".signature")
        .insertAdjacentHTML("afterbegin", svgdata);
      setTimeout(drawPath, 5000);
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
