let baseLink2 =
  "http://martanetza.com/kea/cms/Dyczkowski/wordpress/wp-json/wp/v2/";
let TemplPhotoDetails = document.querySelector(".photoDetailsTemplate");
let TemplPhotoDetails2 = document.querySelector(".photoDetailsTemplate2");
let bigSlides = document.getElementsByClassName("mySlides"); //array
let smallSlides = document.getElementsByClassName("smallSlides");
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");
const arrowLeftWrapper = document.querySelector("#prev6");
const arrowRightWrapper = document.querySelector("#next6");

let showSlide1 = false;
let showSlide2 = false;
var slideIndex = 1;

/*It loads all images/posts, which have the same name as query string (key - value pair)*/
const params2 = new URLSearchParams(window.location.search);
const filterPhotoID = params2.get("phototid");

function refresh() {
  location.reload();
}

window.addEventListener("load", event => {
  console.log("page is fully loaded so slideshow can start");
  slidesRunner();
});

fetch(baseLink2 + filterPhotoID + "?per_page=100&_embed")
  .then(promise => promise.json())
  .then(data => showDetailsPhoto(data));

function showDetailsPhoto(Data) {
  Data.forEach(showDetailsPhotoOne);
  Data.forEach(showDetailsPhotoSmall);

  var inputs = document.querySelectorAll(".sImgInline");
  //adding onclick to every image
  for (i = 0; i < inputs.length; i++) {
    inputs[i].innerHTML =
      '<a onclick="showBigSlide(' +
      (i + 1) +
      ')">' +
      inputs[i].innerHTML +
      "</a>";
  }

  /*Text of the paragraph*/
  function showDetailsPhotoOne(photo) {
    //console.log(photo.content.rendered);
    if (photo.content.rendered) {
      document.querySelector("#photoText").innerHTML = photo.content.rendered;
    }

    const copyPhoto = TemplPhotoDetails.cloneNode(true).content;
    //console.log(photo.id)
    if (photo._embedded) {
      copyPhoto.querySelector("img").src =
        photo._embedded[
          "wp:featuredmedia"
        ][0].media_details.sizes.full.source_url;
      copyPhoto.querySelector("img").alt =
        photo._embedded["wp:featuredmedia"][0].alt_text;
    } else {
      copyPhoto.querySelector("img").remove();
    }
    document.querySelector("#photoWindow").appendChild(copyPhoto);
    showSlide1 = true;
  }

  function showDetailsPhotoSmall(photo2) {
    const copyPhoto2 = TemplPhotoDetails2.cloneNode(true).content;
    if (photo2._embedded) {
      copyPhoto2.querySelector("img").src =
        photo2._embedded[
          "wp:featuredmedia"
        ][0].media_details.sizes.full.source_url;
      copyPhoto2.querySelector("img").alt =
        photo2._embedded["wp:featuredmedia"][0].alt_text;
    } else {
      copyPhoto2.querySelector("img").remove();
    }

    document.querySelector(".smallImagesBox").appendChild(copyPhoto2);
    showSlide2 = true;
  }

  if (showSlide1 && showSlide2) {
    showSlides(slideIndex);
    var timeoutObj;
    //slidesRunner();
  }
}

/*Function showSlides is inspired with the code of an automatic slideshow from W3Schools: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_auto */
function showSlides(n) {
  let i;

  //.length is a number of elements in an array. If n is bigger then the number of slides in an array take into account the first slide
  if (n > bigSlides.length) {
    slideIndex = 1;
  }

  //If n is smaller than one, take into account the last slide
  if (n < 1) {
    slideIndex = bigSlides.length;
  }

  if (slideIndex > 0 && slideIndex < 5) {
    arrowLeft.classList.add("thumbnailsArrowDeactivated");
    arrowLeftWrapper.onclick = "";
  }

  if (slideIndex > 4) {
    arrowLeft.classList.remove("thumbnailsArrowDeactivated");
    arrowLeftWrapper.onclick = function() {
      thumbnailsPrev(slideIndex);
    };
  }

  //apply "display none" to all slides (big and small)
  for (i = 0; i < bigSlides.length; i++) {
    bigSlides[i].style.display = "none";
    smallSlides[i].classList.remove("smallSlideUnderlined");
    smallSlides[i].style.display = "none";
  }

  /*Displaying the big image*/

  if (bigSlides[slideIndex - 1] != null) {
    bigSlides[slideIndex - 1].style.display = "block";

    //underlining the current image
    smallSlides[slideIndex - 1].classList.add("smallSlideUnderlined");
  }
  //if other than the first slide is displayed, display the preceding slide
  if (slideIndex != 1) {
    smallSlides[slideIndex - 2].style.display = "inline";
  }
  //if index of the displayed slide is bigger than 2, display also the second preceding slide of the array
  if (slideIndex > 2) {
    smallSlides[slideIndex - 3].style.display = "inline";
  }
  //if index of the displayed slide is bigger than 3, display also the third preceding slide
  if (slideIndex > 3) {
    smallSlides[slideIndex - 4].style.display = "inline";
  }
  //display the current slide
  if (bigSlides[slideIndex - 1] != null) {
    smallSlides[slideIndex - 1].style.display = "inline";
  }

  //if other than last slide is displayed, display the last one
  if (slideIndex != bigSlides.length) {
    if (smallSlides[slideIndex] != null) {
      smallSlides[slideIndex].style.display = "inline";
    }
  }

  //if other than one before last slide is displayed, display the second following
  if (slideIndex != bigSlides.length - 1) {
    if (bigSlides.length >= slideIndex + 1) {
      smallSlides[slideIndex + 1].style.display = "inline";
    }
  }

  //if the first slide is displayed, then display the 4 one
  if (slideIndex == 1) {
    if (bigSlides.length > 3) {
      smallSlides[3].style.display = "inline";
    }
  }

  //if slide index is smaller or equal to 2, display the 5th slide
  if (slideIndex <= 2) {
    if (bigSlides.length > 4) {
      smallSlides[4].style.display = "inline";
    }
  }

  //if slide index is smaller or equal to 3, display the 6th slide
  if (slideIndex <= 3) {
    if (bigSlides.length > 5) {
      smallSlides[5].style.display = "inline";
    }
  }

  hiddenImage = false;
  for (h = slideIndex; h < smallSlides.length; h++) {
    if (smallSlides[h].style.display == "none") {
      hiddenImage = true;
    }
  }

  if (hiddenImage === false) {
    //console.log("hide");
    arrowRight.classList.add("thumbnailsArrowDeactivated");
    arrowRightWrapper.onclick = "";
  } else {
    //console.log("show");
    arrowRight.classList.remove("thumbnailsArrowDeactivated");
    arrowRightWrapper.onclick = function() {
      thumbnailsNext(slideIndex);
    };
  }
}

function slidesRunner() {
  var smallSlides = document.getElementsByClassName("smallSlides");
  if (window.innerWidth > 767) {
    timeoutObj = setTimeout(slidesRunner, 3000);

    showSlides(slideIndex);
    slideIndex++;
  } else {
    for (i = 0; i < smallSlides.length; i++) {
      smallSlides[i].style.display = "inline-block";
    }
  }

  if (smallSlides.length < 6) {
    arrowRight.classList.add("thumbnailsArrowDeactivated");
    arrowRightWrapper.onclick = "";
  } else {
    arrowRight.classList.remove("thumbnailsArrowDeactivated");
    arrowRightWrapper.onclick = function() {
      thumbnailsNext(slideIndex);
    };
  }
}

//Show slide - this function is activated on onclick
function showBigSlide(n) {
  clearTimeout(timeoutObj);
  slideIndex = n;
  showSlides(slideIndex);
}

function thumbnailsNext(n) {
  slideIndex = n;
  if (slideIndex > 0 && slideIndex < 7) {
    slideIndex = 7;
  } else if (slideIndex > 6 && slideIndex < 13) {
    slideIndex = 13;
  } else if (slideIndex > 12 && slideIndex < 19) {
    slideIndex = 19;
  } else if (slideIndex > 18 && slideIndex < 25) {
    slideIndex = 25;
  } else if (slideIndex > 24 && slideIndex < 31) {
    slideIndex = 31;
  } else {
  } //the empty bracktets mean "do not change slideIndex"

  clearTimeout(timeoutObj);
  moveThumbnails(slideIndex);
  n = slideIndex + 6;
}

function thumbnailsPrev(n) {
  slideIndex = n;
  if (slideIndex > 0 && slideIndex < 7) {
    slideIndex = 1;
    /*  If statement, żeby strzałka prev cofała z ostatniego do pierwszego
   if (smallSlides.length > 6 && smallSlides.length < 13) {
      slideIndex = 7;
    } else if (smallSlides.length > 12 && smallSlides.length < 19) {
      slideIndex = 13;
    } else if (smallSlides.length > 18 && smallSlides.length < 25) {
      slideIndex = 19;
    } else if (smallSlides.length > 24 && smallSlides.length < 31) {
      slideIndex = 25;
    } */
  } else if (slideIndex > 6 && slideIndex < 13) {
    slideIndex = 1;
  } else if (slideIndex > 12 && slideIndex < 19) {
    slideIndex = 7;
  } else if (slideIndex > 18 && slideIndex < 25) {
    slideIndex = 13;
  } else if (slideIndex > 24 && slideIndex < 31) {
    slideIndex = 19;
  } else {
  } //the empty bracktets mean "do not change slideIndex"

  clearTimeout(timeoutObj);
  moveThumbnails(slideIndex);
  n = slideIndex - 6;
}

function moveThumbnails(n) {
  let i;

  //If n is bigger then the number of slides in an array
  if (n > bigSlides.length) {
    slideIndex = n - 6;
  }

  //If n is smaller than one stop at current
  if (n < 1) {
    slideIndex = 1;
  }

  if (slideIndex > 0 && slideIndex < 5) {
    arrowLeft.classList.add("thumbnailsArrowDeactivated");
    arrowLeftWrapper.onclick = "";
  }

  if (slideIndex > 4) {
    arrowLeft.classList.remove("thumbnailsArrowDeactivated");
    arrowLeftWrapper.onclick = function() {
      thumbnailsPrev(slideIndex);
    };
  }

  //apply "display none" to all slides (big and small)
  for (i = 0; i < bigSlides.length; i++) {
    bigSlides[i].style.display = "none";
    smallSlides[i].classList.remove("smallSlideUnderlined");
    smallSlides[i].style.display = "none";
  }

  /*Displaying the big image*/
  bigSlides[slideIndex - 1].style.display = "block";

  //underlining the current image
  smallSlides[slideIndex - 1].classList.add("smallSlideUnderlined");

  //display the current slide
  smallSlides[slideIndex - 1].style.display = "inline";

  if (
    slideIndex + 1 < smallSlides.length ||
    slideIndex + 1 == smallSlides.length
  ) {
    smallSlides[slideIndex].style.display = "inline";
  }

  if (
    slideIndex + 2 < smallSlides.length ||
    slideIndex + 2 == smallSlides.length
  ) {
    smallSlides[slideIndex + 1].style.display = "inline";
  }

  if (
    slideIndex + 3 < smallSlides.length ||
    slideIndex + 3 == smallSlides.length
  ) {
    smallSlides[slideIndex + 2].style.display = "inline";
  }

  if (
    slideIndex + 4 < smallSlides.length ||
    slideIndex + 4 == smallSlides.length
  ) {
    smallSlides[slideIndex + 3].style.display = "inline";
  }

  if (
    slideIndex + 5 < smallSlides.length ||
    slideIndex + 5 == smallSlides.length
  ) {
    smallSlides[slideIndex + 4].style.display = "inline";
  }

  let hiddenImage = false;
  for (h = slideIndex; h < smallSlides.length; h++) {
    if (smallSlides[h].style.display == "none") {
      hiddenImage = true;
    }
  }

  if (hiddenImage === false) {
    //console.log("hide");
    arrowRight.classList.add("thumbnailsArrowDeactivated");
    arrowRightWrapper.onclick = "";
  } else {
    //console.log("show");
    arrowRight.classList.remove("thumbnailsArrowDeactivated");
    arrowRightWrapper.onclick = function() {
      thumbnailsNext(slideIndex);
    };
  }
}
