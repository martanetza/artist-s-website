let baseLink2 = "http://martanetza.com/kea/cms/Dyczkowski/wordpress/wp-json/wp/v2/"
let TemplPhotoDetails = document.querySelector(".photoDetailsTemplate")
let TemplPhotoDetails2 = document.querySelector(".photoDetailsTemplate2")

let showSlide1 = false
let showSlide2 = false
var slideIndex = 1;

const params2 = new
URLSearchParams(window.location.search);
const filterPhotoID = params2.get("phototid");

fetch(baseLink2 + filterPhotoID + "?_embed").then(promise => promise.json()).then(data => showDetailsPhoto(data));

//console.log(filterPhotoID)

function showDetailsPhoto(Data) {
    Data.forEach(showDetailsPhotoOne);
    Data.forEach(showDetailsPhotoSmall);

function showDetailsPhotoOne(photo) {

    console.log(photo.content.rendered)
    if(photo.content.rendered){
       document.querySelector("#photoParagraph").innerHTML = photo.content.rendered
       }


    const copyPhoto = TemplPhotoDetails.cloneNode(true).content;
            //console.log(photo.id)
     if (photo._embedded) {
        copyPhoto.querySelector("img").src = photo._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    } else {
        copyPhoto.querySelector("img").remove()
    }
    document.querySelector("#photoWindow").appendChild(copyPhoto);
showSlide1 = true

}

function showDetailsPhotoSmall(photo2) {
    const copyPhoto2 = TemplPhotoDetails2.cloneNode(true).content;
     if (photo2._embedded) {
        copyPhoto2.querySelector("img").src = photo2._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    } else {
        copyPhoto2.querySelector("img").remove()
    }
    document.querySelector(".smallImagesBox").appendChild(copyPhoto2);
showSlide2 = true

}





//slideshow

if(showSlide1 && showSlide2){
//console.log("check")

 //var slideIndex = 1;



        showSlides(slideIndex); //wywołanie funkcji


}

}



    function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("mySlides"); //array
            var smallSlides = document.getElementsByClassName("smallSlides");

       //.length is a number of elements in an array. If n is bigger then the number of slides in an array show the first slide
            if (n > slides.length) {
                slideIndex = 1;
            }

            //If n is smaller than one, show the last slide
            if (n < 1) {
                slideIndex = slides.length
            }

            //apply "display none" to all slides
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                smallSlides[i].classList.remove("smallSlideUnderlined");
                smallSlides[i].style.display = "none";
            }


            //-1, to show the first slide, because arrays atart from 0 and our var slideIndex = 1;
            slides[slideIndex - 1].style.display = "inline";
            smallSlides[slideIndex -1].classList.add("smallSlideUnderlined");

            //if other than the first slide is displayed, display the preceding slide
            if (slideIndex != 1){
                smallSlides[slideIndex - 2].style.display = "inline";
            }
            //if index of the displayed slide is bigger than 2, display also the second preceding slide of the array
            if (slideIndex > 2){
                smallSlides[slideIndex - 3].style.display = "inline";
            }
            //if index of the displayed slide is bigger than 3, display also the third preceding slide
            if (slideIndex > 3){
                smallSlides[slideIndex - 4].style.display = "inline";
            }
            //display the current slide
            smallSlides[slideIndex - 1].style.display = "inline";

            //if other than last slide is displayed, display the last one
            if (slideIndex != slides.length){
                smallSlides[slideIndex].style.display = "inline";
            }

            //if other than one before last slide is displayed, display the second following
            if (slideIndex != (slides.length -1)){
                smallSlides[slideIndex + 1].style.display = "inline";
            }


           //if the first slide is displayed, then display the 4 one
            if (slideIndex == 1){
                smallSlides[3].style.display = "inline";
            }

            //if slide index is smaller or equal to 2, display the 5th slide
            if (slideIndex <= 2){
                smallSlides[4].style.display = "inline";
            }

            //if slide index is smaller or equal to 3, display the 6th slide
            if (slideIndex <= 3){
                smallSlides[5].style.display = "inline";
            }

        }

        // Next/previous controls
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        //show slide
         function showSlide(n) {
                slideIndex = n;
            showSlides(slideIndex);
        }















