let templatePhoto = document.querySelector(".photoTemplate");


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
        copy.querySelector("a").href = "photo_detail.html?phototid=" + p.title.rendered;

        if (p._embedded) {
            copy.querySelector("img").src = p._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        } else {
            copy.querySelector(".painting img").remove()
        }



        document.querySelector(".photos").appendChild(copy)

    }
