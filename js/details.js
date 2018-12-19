let baseLink2 = "http://martanetza.com/kea/cms/Dyczkowski/wordpress/wp-json/wp/v2/"
let TemplPhotoDetails = document.querySelector(".photoDetailsTemplate")
let TemplPhotoDetails2 = document.querySelector(".photoDetailsTemplate2")

let showSlide1 = false
let showSlide2 = false

const params2 = new
URLSearchParams(window.location.search);
const filterPhotoID = params2.get("phototid");

fetch(baseLink2 + filterPhotoID + "?_embed").then(promise => promise.json()).then(data => showDetailsPhoto(data));

console.log(filterPhotoID)

function showDetailsPhoto(Data) {
    Data.forEach(showDetailsPhotoOne);
    Data.forEach(showDetailsPhotoSmall);

function showDetailsPhotoOne(photo) {

    const copyPhoto = TemplPhotoDetails.cloneNode(true).content;
            console.log(photo.id)
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
console.log("check")

 var slideIndex = 1;


        function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("mySlides"); //array
            var smallSlides = document.getElementsByClassName("smallSlides");

            console.log(smallSlides)

            //.length to ilość elementów w arrayu. Jeśli n większe niż ilość slajdów w arrayu to pokazuje pierwszy slajd
            if (n > slides.length) {
                slideIndex = 1;
            }

            //Jeśli n mniejsze od 1 to pokazuje ostatni slajd
            if (n < 1) {
                slideIndex = slides.length
            }

            //każdy slajd "display none"
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                smallSlides[i].classList.remove("smallSlideUnderlined");
                smallSlides[i].style.display = "none";
            }


            //-1, żeby pokazać pierwszy slajd, bo w arrayu start od 0, a var zdef jako 1
            slides[slideIndex - 1].style.display = "inline";
            smallSlides[slideIndex -1].classList.add("smallSlideUnderlined");

            //jeśli jest wyświetlany inny slajd niż pierwszy to wyświetlaj wcześniejszy slajd
            if (slideIndex != 1){
                smallSlides[slideIndex - 2].style.display = "inline";
            }
            //jeśli indeks wyświetlanego slajdu jest większy niż 2 to wyświetlaj też slajd który jest o 2 miejsca wcześniej w array
            if (slideIndex > 2){
                smallSlides[slideIndex - 3].style.display = "inline";
            }

            if (slideIndex > 3){
                smallSlides[slideIndex - 4].style.display = "inline";
            }
            //wyświetlaj bieżący slajd
            smallSlides[slideIndex - 1].style.display = "inline";

            //jeśli nie jest wyświetlany ostatni slajd to wyświetl następny
            if (slideIndex != slides.length){
                smallSlides[slideIndex].style.display = "inline";
            }

            //jeśli nie jest wyświetlany przedostatni slajd to
            if (slideIndex != (slides.length -1)){
                smallSlides[slideIndex + 1].style.display = "inline";
            }


           //jeśli jest wyświetlany pierwszy slajd to wyświetl drugi slajd
            if (slideIndex == 1){
                smallSlides[3].style.display = "inline";
            }

            //jeśli wyświetlony pierwszy lub drugi to pokazanie trzeciego
            if (slideIndex <= 2){
                smallSlides[4].style.display = "inline";
            }

            //jeśli wyświetlony pierwszy lub drugi to pokazanie trzeciego
//            if (slideIndex <= 3){
//                smallSlides[5].style.display = "inline";
//            }

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

        showSlides(slideIndex); //wywołanie funkcji


}




}










