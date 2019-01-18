let baseLink2 = "http://martanetza.com/kea/cms/Dyczkowski/wordpress/wp-json/wp/v2/"
let TemplPhotoDetails = document.querySelector(".photoDetailsTemplate")
let TemplPhotoDetails2 = document.querySelector(".photoDetailsTemplate2")

let showSlide1 = false
let showSlide2 = false
var slideIndex = 1;
var photoSrcs = [];

/*It loads all images/posts, which have the same name as query string (key - value pair)*/
    const params2 = new
    URLSearchParams(window.location.search);
    const filterPhotoID = params2.get("phototid");

    fetch(baseLink2 + filterPhotoID + "?_embed").then(promise => promise.json()).then(data => showDetailsPhoto(data));

//console.log(filterPhotoID)

function showDetailsPhoto(Data) {
    Data.forEach(showDetailsPhotoOne);
    Data.forEach(showDetailsPhotoSmall);


    var inputs = document.querySelectorAll(".sImgInline");
    //adding onclick to every image
    for (i = 0; i < inputs.length; i++) {
        inputs[i].innerHTML = '<a onclick="showBigSlide(' + (i + 1) + ')">' + inputs[i].innerHTML + '</a>';
    }


    /*Text of the paragraph*/
    function showDetailsPhotoOne(photo) {

        console.log(photo.content)
        if(photo.content.rendered){
           document.querySelector("#photoParagraph").innerHTML = photo.content.rendered
        }


        const copyPhoto = TemplPhotoDetails.cloneNode(true).content;
                //console.log(photo.id)
        if (photo._embedded) {
            copyPhoto.querySelector("img").src = photo._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        }
        else {
            copyPhoto.querySelector("img").remove()
        }
        document.querySelector("#photoWindow").appendChild(copyPhoto);
        showSlide1 = true
    }

    function showDetailsPhotoSmall(photo2) {
        const copyPhoto2 = TemplPhotoDetails2.cloneNode(true).content;
         if (photo2._embedded) {
            copyPhoto2.querySelector("img").src = photo2._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
             photoSrcs.push(photo2._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url);
        } else {
            copyPhoto2.querySelector("img").remove();
        }

        document.querySelector(".smallImagesBox").appendChild(copyPhoto2);
    showSlide2 = true

}

if(showSlide1 && showSlide2){
    showSlides(slideIndex);
    var timeoutObj;
    slidesRunner();
}

}




/*Function showSlides is inspired with the code of an automatic slideshow from W3Schools: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_auto */

    function showSlides(n) {
            var i;
            var bigSlides = document.getElementsByClassName("mySlides"); //array
            var smallSlides = document.getElementsByClassName("smallSlides");
            var smallSlidesDivs = document.getElementsByClassName("smallPhotosDivs");

            //.length is a number of elements in an array. If n is bigger then the number of slides in an array take into account the first slide
            if (n > bigSlides.length) {
                slideIndex = 1;
            }

            //If n is smaller than one, take into account the last slide
            if (n < 1) {
                slideIndex = bigSlides.length
            }


            //apply "display none" to all slides (big and small)
            for (i = 0; i < bigSlides.length; i++) {
                bigSlides[i].style.display = "none";
                //smallSlides[i].classList.remove("smallSlideUnderlined");
                smallSlides[i].style.display = "none";
                //smallSlidesDivs[1].style.display = "none";
            }


            /*Displaying the big image*/
            bigSlides[slideIndex - 1].style.display = "inline";

            //underlining the current image
            //smallSlides[slideIndex -1].classList.add("smallSlideUnderlined");

var i;
        var t;
if (slideIndex == 1 || slideIndex == 2 || slideIndex == 3){
    for (i = 0; i < smallSlidesDivs.length; i++) {
        if (photoSrcs.length > i){
            t = "<img src='" + photoSrcs[i] + "'";
            if (i == (slideIndex - 1)){
                t += " class='smallSlideUnderlined'";
            }
            t += " />";
            smallSlidesDivs[i].innerHTML = t
        }
    }
}
        var j;
if (slideIndex > 3 && slideIndex < (photoSrcs.length - 2)){
    for (i = 0; i < smallSlidesDivs.length; i++) {
        j=i+(slideIndex-3);//poprzedni if zajmuje się pierwszymi 3 slajdami
        if (photoSrcs.length > j){
            t = "<img src='" + photoSrcs[j] + "'";
            if (i == 2){
                t += " class='smallSlideUnderlined'";
            }
            t += " />";
            smallSlidesDivs[i].innerHTML = t
        }
    }
}
//to do: przesunięcie podkreślenia na ostatnie 3 obrazki


            }

function slidesRunner(){
    timeoutObj = setTimeout(slidesRunner, 3000);

    showSlides(slideIndex);
     slideIndex++;
}


/*Next/previous controls
function plusSlides(n) {
showSlides(slideIndex += n);
}*/

//Show slide - this function is activated on onclick
function showBigSlide(n) {
    clearTimeout(timeoutObj);
    slideIndex = n;
    showSlides(slideIndex);
}


















