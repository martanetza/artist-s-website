let templatePhoto = document.querySelector(".photoTemplate");


fetch(PhotoCatLink + "/" + filterID).then(e => e.json()).then(showTitle);

    function showTitle(t){
        let templateTitle = document.querySelector(".pageTitleTmpl")
        const copy = templateTitle.cloneNode(true).content;
        copy.querySelector("h2").textContent = t.name;
        document.querySelector(".pageTitle").appendChild(copy)


        console.log("showTitle_test")
    }


function loadContByCategoryPhoto(filterID) {
        fetch(baseLink + "photography?photo=" + filterID + "&_embed").then(e => e.json()).then(showDataByCategoryPhoto);
            console.log("test")

    }

loadContByCategoryPhoto(filterID);

function showDataByCategoryPhoto(List) {
        List.forEach(showSinglePhotoItemFiltered)
        console.log(List)
    }

  function showSinglePhotoItemFiltered(p) {
        const copy = templatePhoto.cloneNode(true).content;
        copy.querySelector(".title").textContent = p.title.rendered;
        if(p.title.rendered == "Rozyczka"){
           copy.querySelector(".title").textContent = "różyczka";
        }
      if(p.title.rendered == "Milion"){
           copy.querySelector(".title").textContent = "milion $";
        }
      if(p.title.rendered == "Prymas"){
           copy.querySelector(".title").textContent = "prymas w komańczy";
        }
      if(p.title.rendered == "Wiem"){
           copy.querySelector(".title").textContent = "wiem, że nie śpisz";
        }
        copy.querySelector("a").href = "photo_detail.html?phototid=" + p.title.rendered;

        if (p._embedded) {
            copy.querySelector("img").src = p._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
            copy.querySelector("img").alt = p._embedded["wp:featuredmedia"][0].alt_text;
        } else {
            copy.querySelector(".painting img").remove()
        }

        document.querySelector(".photos").appendChild(copy)

    }

if (filterID == 9) {
    document.querySelector(".textFilmPhoto").style.display = "block"
    document.querySelector(".textPhotoStories").style.display = "none"

}
if (filterID == 10) {
    document.querySelector(".textPhotoStories").style.display = "block"
    document.querySelector(".textFilmPhoto").style.display = "none"

}










